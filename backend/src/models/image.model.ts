// src/models/image.model.ts

// Interfaz de tipo
export interface IImage {
  image_id?: number;
  url: string;
  activity_id: number;
  public_id: string;
  is_cover: boolean;
}
