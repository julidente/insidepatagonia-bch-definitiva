// src/controllers/post.controller.ts
import { Request, Response } from 'express';
import postService from '../services/post.service';

class PostController {
  async getAll(_req: Request, res: Response) {
    try {
      const posts = await postService.getAll();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPublished(_req: Request, res: Response) {
    try {
      const posts = await postService.getPublished();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID no proporcionado' });
      }

      const post = await postService.getById(Number(id));
      res.json(post);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async getBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      if (!slug) {
        return res.status(400).json({ message: 'Slug no proporcionado' });
      }

      const post = await postService.getBySlug(slug);
      res.json(post);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const post = await postService.create(req.body);
      res.status(201).json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async uploadImage(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID no proporcionado' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Archivo no recibido' });
      }

      const post = await postService.uploadImage({
        post_id: Number(id),
        filePath: req.file.path,
      });

      res.status(201).json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID no proporcionado' });
      }

      const post = await postService.update(Number(id), req.body);
      res.json(post);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID no proporcionado' });
      }

      await postService.delete(Number(id));
      res.json({ message: 'Artículo eliminado correctamente' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new PostController();
