// src/repositories/province.repository.ts
import { Province } from '../models/entity/province.entity';

export class ProvinceRepository {
  async getAll() {
    return await Province.findAll();
  }

  async getById(province_id: number) {
    return await Province.findByPk(province_id);
  }

  async create(data: { name: string }) {
    return await Province.create(data);
  }

  async update(province_id: number, data: { name?: string }) {
    const province = await Province.findByPk(province_id);
    if (!province) return null;
    return await province.update(data);
  }

  async delete(province_id: number) {
    const province = await Province.findByPk(province_id);
    if (!province) return null;
    await province.destroy();
    return province;
  }
}

// Exportamos una instancia lista para usar
export default new ProvinceRepository();
