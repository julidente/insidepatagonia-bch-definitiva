// src/repositories/city.repository.ts
import { City } from '../models/entity/city.entity';

export class CityRepository {
  async getAll() {
    return await City.findAll();
  }

  async getById(city_id: number) {
    return await City.findByPk(city_id);
  }

  async create(data: { name: string; province_id: number }) {
    return await City.create(data);
  }

  async update(city_id: number, data: { name?: string; province_id?: number }) {
    const city = await City.findByPk(city_id);
    if (!city) return null;
    return await city.update(data);
  }

  async delete(city_id: number) {
    const city = await City.findByPk(city_id);
    if (!city) return null;
    await city.destroy();
    return city;
  }
}

// Exportamos una instancia lista para usar
export default new CityRepository();
