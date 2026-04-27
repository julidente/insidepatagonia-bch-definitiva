import { Request, Response } from 'express';
import imageService from '../services/image.service';

class ImageController {
  async getAll(req: Request, res: Response) {
    try {
      const images = await imageService.getAll();
      res.json(images);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const image = await imageService.getById(Number(id));
      res.json(image);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { activity_id, is_cover } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'Archivo no recibido' });
      }

      const image = await imageService.create({
        filePath: req.file.path,
        activity_id: Number(activity_id),
        is_cover: is_cover === true || is_cover === 'true',
      });

      res.status(201).json(image);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const image = await imageService.update(Number(id), req.body);
      res.json(image);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await imageService.delete(Number(id));
      res.json({ message: 'Imagen eliminada correctamente' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new ImageController();

// con clouddinary config
/* async create(req: Request, res: Response) {
    try {
      const { activity_id } = req.body;
      if (!req.file) return res.status(400).json({ message: 'Archivo no recibido' });

      const image = await imageService.create(req.file.path, Number(activity_id));
      res.status(201).json(image);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } */

// con url de la imagen en base de datos
