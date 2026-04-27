// src/services/category.service.ts
import categoryRepository from '../repositories/category.repository';

export class CategoryService {
  async getAll() {
    return await categoryRepository.getAll();
  }

  async getById(category_id: number) {
    const category = await categoryRepository.getById(category_id);
    if (!category) throw new Error('Categoría no encontrada');
    return category;
  }

  async create(data: { name: string; description?: string }) {
    return await categoryRepository.create(data);
  }

  async update(category_id: number, data: { name?: string; description?: string }) {
    const updated = await categoryRepository.update(category_id, data);
    if (!updated) throw new Error('Categoría no encontrada');
    return updated;
  }

  async delete(category_id: number) {
    const deleted = await categoryRepository.delete(category_id);
    if (!deleted) throw new Error('Categoría no encontrada');
    return deleted;
  }
}

export default new CategoryService();
