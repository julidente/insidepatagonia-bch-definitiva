// src/repositories/image.repository.ts
import { Image } from '../models/entity/image.entity';

type CreateImageData = {
  url: string;
  public_id: string;
  is_cover?: boolean;
  activity_id: number;
};

type UpdateImageData = {
  url?: string;
  public_id?: string;
  is_cover?: boolean;
  activity_id?: number;
};

export class ImageRepository {
  async getAll() {
    return await Image.findAll();
  }

  async getById(image_id: number) {
    return await Image.findByPk(image_id);
  }

  async getByActivityId(activity_id: number) {
    return await Image.findAll({
      where: { activity_id },
    });
  }

  async create(data: CreateImageData) {
    return await Image.create(data);
  }

  async update(image_id: number, data: UpdateImageData) {
    const image = await Image.findByPk(image_id);
    if (!image) return null;

    return await image.update(data);
  }

  async delete(image_id: number) {
    const image = await Image.findByPk(image_id);
    if (!image) return null;

    await image.destroy();
    return image;
  }
}

export default new ImageRepository();
