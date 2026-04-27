import { Response } from 'express';
import cloudinary from '../config/cloudinary';
import fs from 'fs';
import { MulterRequest } from '../dtos/multeRequest.dto';

export const uploadImage = async (req: MulterRequest, res: Response) => {
  try {
    const file = req.file?.path;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await cloudinary.uploader.upload(file, { folder: 'actividades' });
    fs.unlinkSync(file); // elimina el archivo temporal

    return res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
