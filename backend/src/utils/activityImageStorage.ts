import fs from 'fs/promises';
import path from 'path';
import cloudinary from '../config/cloudinary';

const ACTIVITY_UPLOAD_DIR = path.join(__dirname, '../../public/uploads/activities');
const PUBLIC_UPLOAD_PREFIX = '/uploads/activities';

function getSafeExtension(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();
  const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

  return allowedExtensions.has(extension) ? extension : '.jpg';
}

export async function saveActivityImageLocally(filePath: string) {
  await fs.mkdir(ACTIVITY_UPLOAD_DIR, { recursive: true });

  const extension = getSafeExtension(filePath);
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
  const destinationPath = path.join(ACTIVITY_UPLOAD_DIR, uniqueName);

  await fs.rename(filePath, destinationPath);

  return {
    url: `${PUBLIC_UPLOAD_PREFIX}/${uniqueName}`,
    public_id: `activities/${uniqueName}`,
    filePath: destinationPath,
  };
}

export async function deleteActivityImageFile(image: { url?: string | null; public_id?: string | null }) {
  const url = image.url ?? '';
  const publicId = image.public_id ?? '';

  if (url.includes('res.cloudinary.com') && publicId) {
    await cloudinary.uploader.destroy(publicId).catch(() => {});
    return;
  }

  const fileNameFromUrl = url.startsWith(PUBLIC_UPLOAD_PREFIX)
    ? path.basename(url)
    : publicId.startsWith('activities/')
      ? path.basename(publicId)
      : null;

  if (!fileNameFromUrl) return;

  const filePath = path.join(ACTIVITY_UPLOAD_DIR, fileNameFromUrl);
  await fs.unlink(filePath).catch(() => {});
}
