// src/services/city.service.ts
import cityRepository from '../repositories/city.repository';
import { ICity } from '../models/city.model';

export class CityService {
  // NORMAL
  async getAll() {
    return await cityRepository.getAll();
  }

  //TIPADO REFORZADO
  // async getAll(): Promise<ICity[]> {
  //   return await cityRepository.getAll();
  // }

  async getById(city_id: number) {
    const city = await cityRepository.getById(city_id);
    if (!city) throw new Error('Ciudad no encontrada');
    return city;
  }

  async create(data: { name: string; province_id: number }) {
    return await cityRepository.create(data);
  }

  async update(city_id: number, data: { name?: string; province_id?: number }) {
    const city = await cityRepository.update(city_id, data);
    if (!city) throw new Error('Ciudad no encontrada');
    return city;
  }

  async delete(city_id: number) {
    const deleted = await cityRepository.delete(city_id);
    if (!deleted) throw new Error('Ciudad no encontrada');
    return deleted;
  }
}

export default new CityService();
