// src/services/image.service.ts
import fs from 'fs/promises';
import imageRepository from '../repositories/image.repository';
import {
  deleteActivityImageFile,
  saveActivityImageLocally,
} from '../utils/activityImageStorage';

type CreateImageData = {
  filePath: string;
  activity_id: number;
  is_cover?: boolean;
};

type UpdateImageData = {
  url?: string;
  public_id?: string;
  is_cover?: boolean;
  activity_id?: number;
};

export class ImageService {
  async getAll() {
    return await imageRepository.getAll();
  }

  async getById(image_id: number) {
    const image = await imageRepository.getById(image_id);
    if (!image) throw new Error('Imagen no encontrada');
    return image;
  }

  async create({ filePath, activity_id, is_cover = false }: CreateImageData) {
    let savedImage: Awaited<ReturnType<typeof saveActivityImageLocally>> | null = null;

    try {
      savedImage = await saveActivityImageLocally(filePath);

      if (is_cover) {
        const existingImages = await imageRepository.getByActivityId(activity_id);
        const existingCovers = existingImages.filter((img) => img.is_cover);

        for (const cover of existingCovers) {
          await deleteActivityImageFile(cover);
          await imageRepository.delete(cover.image_id);
        }
      }

      const image = await imageRepository.create({
        url: savedImage.url,
        public_id: savedImage.public_id,
        is_cover,
        activity_id,
      });

      return image;
    } catch (error) {
      if (savedImage) {
        await fs.unlink(savedImage.filePath).catch(() => {});
      }

      throw error;
    } finally {
      await fs.unlink(filePath).catch(() => {});
    }
  }

  async update(image_id: number, data: UpdateImageData) {
    const image = await imageRepository.update(image_id, data);
    if (!image) throw new Error('Imagen no encontrada');
    return image;
  }

  async delete(image_id: number) {
    const image = await imageRepository.getById(image_id);
    if (!image) throw new Error('Imagen no encontrada');

    await deleteActivityImageFile(image);

    const deleted = await imageRepository.delete(image_id);
    if (!deleted) throw new Error('Imagen no encontrada');

    return deleted;
  }
}

export default new ImageService();
