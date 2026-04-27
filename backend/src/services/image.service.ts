// src/services/image.service.ts
import fs from 'fs/promises';
import cloudinary from '../config/cloudinary';
import imageRepository from '../repositories/image.repository';

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
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'activities',
    });

    try {
      if (is_cover) {
        const existingImages = await imageRepository.getByActivityId(activity_id);
        const existingCovers = existingImages.filter((img) => img.is_cover);

        for (const cover of existingCovers) {
          if (cover.public_id) {
            await cloudinary.uploader.destroy(cover.public_id);
          }

          await imageRepository.delete(cover.image_id);
        }
      }

      const image = await imageRepository.create({
        url: result.secure_url,
        public_id: result.public_id,
        is_cover,
        activity_id,
      });

      return image;
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

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    const deleted = await imageRepository.delete(image_id);
    if (!deleted) throw new Error('Imagen no encontrada');

    return deleted;
  }
}

export default new ImageService();

// src/services/image.service.ts
// usando dinary config
// import { Image } from '../models/entity/image.entity';
// import cloudinary from '../config/cloudinary';

// class ImageService {
//   async getAll() {
//     return await Image.findAll();
//   }

//   async getById(image_id: number) {
//     const image = await Image.findByPk(image_id);
//     if (!image) throw new Error('Imagen no encontrada');
//     return image;
//   }

//   async create(filePath: string, activity_id: number) {
//     // Subir a Cloudinary
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'activities',
//     });

//     // Guardar URL en la DB
//     const image = await Image.create({
//       url: result.secure_url,
//       activity_id,
//     });

//     return image;
//   }

//   async update(image_id: number, data: { url?: string; activity_id?: number }) {
//     const image = await Image.findByPk(image_id);
//     if (!image) throw new Error('Imagen no encontrada');
//     return await image.update(data);
//   }

//   async delete(image_id: number) {
//     const image = await Image.findByPk(image_id);
//     if (!image) throw new Error('Imagen no encontrada');

//     // Opcional: eliminar de Cloudinary si guardaste el public_id
//     await image.destroy();
//     return image;
//   }
// }

// export default new ImageService();
