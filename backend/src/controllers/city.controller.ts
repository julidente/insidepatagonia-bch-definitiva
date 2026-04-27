/* import { Request, Response } from 'express';
import { City } from '../models/entity/city.entity';

class CityController {
  async getAll(req: Request, res: Response) {
    try {
      const cities = await City.findAll();
      res.json(cities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener ciudades' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'ID requerido' });

      const city = await City.findByPk(id);
      if (!city) return res.status(404).json({ message: 'Ciudad no encontrada' });

      res.json(city);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la ciudad' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, province_id } = req.body;
      const city = await City.create({ name, province_id });
      res.status(201).json(city);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la ciudad' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, province_id } = req.body;

      const city = await City.findByPk(id);
      if (!city) return res.status(404).json({ message: 'Ciudad no encontrada' });

      await city.update({ name, province_id });
      res.json(city);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la ciudad' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const city = await City.findByPk(id);
      if (!city) return res.status(404).json({ message: 'Ciudad no encontrada' });

      await city.destroy();
      res.json({ message: 'Ciudad eliminada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la ciudad' });
    }
  }
}

export default new CityController(); */

// src/controllers/city.controller.ts
// con el singleton
import { Request, Response } from 'express';
import cityService from '../services/city.service';

class CityController {
  async getAll(req: Request, res: Response) {
    try {
      const cities = await cityService.getAll();
      res.json(cities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const city = await cityService.getById(Number(id));
      res.json(city);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, province_id } = req.body;
      const city = await cityService.create({ name, province_id });
      res.status(201).json(city);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const city = await cityService.update(Number(id), req.body);
      res.json(city);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await cityService.delete(Number(id));
      res.json({ message: 'Ciudad eliminada correctamente' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new CityController();
