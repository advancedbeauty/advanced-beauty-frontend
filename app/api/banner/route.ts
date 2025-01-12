import { NextRequest, NextResponse } from 'next/server';
import { unlink, writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { SlideImage } from '@/types/banner-image';

// Ensure directories exist
async function ensureDirectories() {
    const publicBannerPath = join(process.cwd(), 'public', 'bannerImages');
    const dataPath = join(process.cwd(), 'data');

    if (!existsSync(publicBannerPath)) {
        await mkdir(publicBannerPath, { recursive: true });
    }

    if (!existsSync(dataPath)) {
        await mkdir(dataPath, { recursive: true });
    }
}

// Get current slides from the file
async function getCurrentSlides(): Promise<SlideImage[]> {
    try {
        const slidesPath = join(process.cwd(), 'data', 'HomeBanners.ts');
        if (!existsSync(slidesPath)) {
            return [];
        }

        const fileContent = await readFile(slidesPath, 'utf-8');
        // Extract the array content using regex
        const match = fileContent.match(/const slides: SlideImage\[\] = (\[[\s\S]*?\]);/);
        if (match && match[1]) {
            return JSON.parse(match[1]);
        }
        return [];
    } catch (error) {
        console.error('Error reading slides:', error);
        return [];
    }
}

// Update slides file
async function updateSlidesFile(slides: SlideImage[]) {
    const slidesPath = join(process.cwd(), 'data', 'HomeBanners.ts');
    const content = `import { SlideImage } from '@/types/banner-image';

const slides: SlideImage[] = ${JSON.stringify(slides, null, 2)};

export default slides;`;

    await writeFile(slidesPath, content, 'utf-8');
}

export async function POST(request: NextRequest) {
    try {
        await ensureDirectories();

        const formData = await request.formData();
        const file = formData.get('banner') as File;
        const alt = formData.get('alt') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `banner-${uniqueSuffix}${getExtension(file.name)}`;

        const filepath = join(process.cwd(), 'public', 'bannerImages', filename);
        await writeFile(filepath, buffer);

        const imagePath = `/bannerImages/${filename}`;

        // Get current slides
        const currentSlides = await getCurrentSlides();
        const newSlide: SlideImage = {
            src: imagePath,
            alt: alt || `Banner ${currentSlides.length + 1}`,
        };

        // Add new slide to the beginning of the array
        const updatedSlides = [newSlide, ...currentSlides];
        await updateSlidesFile(updatedSlides);

        return NextResponse.json({
            success: true,
            slide: newSlide,
        });
    } catch (error: unknown) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Error uploading file',
            },
            { status: 500 }
        );
    }
}

function getExtension(filename: string) {
    return filename.substring(filename.lastIndexOf('.'));
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
        }

        // Delete the file from public folder
        const filepath = join(process.cwd(), 'public', filename.replace(/^\//, ''));
        if (existsSync(filepath)) {
            await unlink(filepath);
        }

        // Get current slides and remove the deleted one
        const currentSlides = await getCurrentSlides();
        const updatedSlides = currentSlides.filter((slide: SlideImage) => !slide.src.includes(filename));

        // Update the slides file
        await updateSlidesFile(updatedSlides);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Error deleting file' }, { status: 500 });
    }
}
