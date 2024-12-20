'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import slides from '@/data/HomeBanners';
import { SlideImage } from '@/types/banner-image';

interface FormInputs {
    banner: FileList;
    alt: string;
}

export default function ManageHeroSection() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [banners, setBanners] = useState<SlideImage[]>(slides);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormInputs>();
    const router = useRouter();

    const onSubmit = async (data: FormInputs) => {
        try {
            setIsUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('banner', data.banner[0]);
            formData.append('alt', data.alt);

            const response = await fetch('/api/banner', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed');
            }

            setBanners([...banners, result.slide]);
            reset();
            router.refresh();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error uploading banner';
            setError(errorMessage);
            console.error('Error uploading banner:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (src: string) => {
        try {
            setError(null);
            const response = await fetch(`/api/banner?filename=${encodeURIComponent(src)}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            setBanners(banners.filter((banner) => banner.src !== src));
            router.refresh();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error deleting banner';
            setError(errorMessage);
            console.error('Error deleting banner:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Banner Management</h1>

            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
                <div>
                    <label className="block mb-2">Upload Banner</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        {...register('banner', {
                            required: 'Banner image is required',
                            validate: {
                                fileSize: (files) =>
                                    !files[0] || files[0].size <= 5 * 1024 * 1024 || 'File size must be less than 5MB',
                                fileType: (files) =>
                                    !files[0] ||
                                    ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type) ||
                                    'Only JPEG, PNG and WebP files are allowed',
                            },
                        })}
                        className="border p-2 rounded w-full"
                    />
                    {errors.banner && <p className="text-red-500 text-sm mt-1">{errors.banner.message}</p>}
                </div>
                <div>
                    <label className="block mb-2">Alt Text</label>
                    <input
                        type="text"
                        {...register('alt', { required: 'Alt text is required' })}
                        className="border p-2 rounded w-full"
                        placeholder="Enter descriptive text for the image"
                    />
                    {errors.alt && <p className="text-red-500 text-sm mt-1">{errors.alt.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isUploading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                    {isUploading ? 'Uploading...' : 'Upload Banner'}
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="relative aspect-video">
                            <Image
                                src={banner.src}
                                alt={banner.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-600 mb-2">{banner.alt}</p>
                            <button
                                onClick={() => handleDelete(banner.src)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                            >
                                Delete Banner
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
