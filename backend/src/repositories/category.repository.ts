// src/repositories/category.repository.ts
import { Category } from '../models/entity/category.entity';

export class CategoryRepository {
  async getAll() {
    return await Category.findAll();
  }

  async getById(category_id: number) {
    return await Category.findByPk(category_id, { include: ['activities'] });
  }

  async create(data: { name: string; description?: string }) {
    return await Category.create(data);
  }

  async update(category_id: number, data: { name?: string; description?: string }) {
    const category = await Category.findByPk(category_id);
    if (!category) return null;
    return await category.update(data);
  }

  async delete(category_id: number) {
    const category = await Category.findByPk(category_id);
    if (!category) return null;
    await category.destroy();
    return true;
  }
}

export default new CategoryRepository();
