// src/services/province.service.ts
import provinceRepository from '../repositories/province.repository';

export class ProvinceService {
  async getAll() {
    return await provinceRepository.getAll();
  }

  async getById(province_id: number) {
    const province = await provinceRepository.getById(province_id);
    if (!province) throw new Error('Provincia no encontrada');
    return province;
  }

  async create(data: { name: string }) {
    return await provinceRepository.create(data);
  }

  async update(province_id: number, data: { name?: string }) {
    const province = await provinceRepository.update(province_id, data);
    if (!province) throw new Error('Provincia no encontrada');
    return province;
  }

  async delete(province_id: number) {
    const deleted = await provinceRepository.delete(province_id);
    if (!deleted) throw new Error('Provincia no encontrada');
    return deleted;
  }
}

export default new ProvinceService();
