// src/controllers/province.controller.ts
import { Request, Response } from 'express';
import provinceService from '../services/province.service';

class ProvinceController {
  async getAll(req: Request, res: Response) {
    try {
      const provinces = await provinceService.getAll();
      res.json(provinces);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const province = await provinceService.getById(Number(id));
      res.json(province);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const province = await provinceService.create({ name });
      res.status(201).json(province);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const province = await provinceService.update(Number(id), req.body);
      res.json(province);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await provinceService.delete(Number(id));
      res.json({ message: 'Provincia eliminada correctamente' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new ProvinceController();
