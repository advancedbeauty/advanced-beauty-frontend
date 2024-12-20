import multer from 'multer';
import { join } from 'path';
import fs from 'fs';

// Ensure bannerImages directory exists
const uploadDir = join(process.cwd(), 'public/bannerImages');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `banner-${uniqueSuffix}${getExtension(file.originalname)}`);
    },
});

function getExtension(filename: string) {
    return filename.substring(filename.lastIndexOf('.'));
}

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
            cb(new Error('Only JPEG, PNG and WebP files are allowed'));
            return;
        }
        cb(null, true);
    },
});
