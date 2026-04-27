import fs from 'fs/promises';
import cloudinary from '../config/cloudinary';
import { CreatePostDTO, UpdatePostDTO } from '../dtos/post.dto';
import { Post } from '../models/entity/post.entity';
import postRepository from '../repositories/post.repository';

export class PostService {
  private generateSlug(title: string): string {
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return slug || 'articulo';
  }

  private generateMetaTitle(title: string): string {
    return `${title} | Inside Patagonia`;
  }

  private generateMetaDescription(description: string): string {
    const cleanText = description.replace(/\s+/g, ' ').trim();
    return cleanText.length > 160 ? `${cleanText.slice(0, 157)}...` : cleanText;
  }

  private async generateUniqueSlug(title: string, currentPostId?: number): Promise<string> {
    const baseSlug = this.generateSlug(title);
    let slug = baseSlug;
    let counter = 2;

    while (true) {
      const existingPost = await postRepository.getAnyBySlug(slug);

      if (!existingPost) {
        return slug;
      }

      if (currentPostId && existingPost.post_id === currentPostId) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  async getAll(): Promise<Post[]> {
    return await postRepository.getAll();
  }

  async getPublished(): Promise<Post[]> {
    return await postRepository.getPublished();
  }

  async getById(post_id: number): Promise<Post> {
    const post = await postRepository.getById(post_id);
    if (!post) throw new Error('Artículo no encontrado');
    return post;
  }

  async getBySlug(slug: string): Promise<Post> {
    const post = await postRepository.getBySlug(slug);
    if (!post) throw new Error('Artículo no encontrado');
    return post;
  }

  async create(data: CreatePostDTO): Promise<Post> {
    const slug = await this.generateUniqueSlug(data.title);
    const meta_title = this.generateMetaTitle(data.title);
    const meta_description = this.generateMetaDescription(data.description);

    const createdPost = await postRepository.create({
      ...data,
      slug,
      meta_title,
      meta_description,
      is_published: data.is_published ?? true,
      cover_image_url: data.cover_image_url ?? null,
      cover_image_public_id: data.cover_image_public_id ?? null,
    });

    return createdPost;
  }

  async uploadImage({ post_id, filePath }: { post_id: number; filePath: string }): Promise<Post> {
    const post = await postRepository.getById(post_id);
    if (!post) throw new Error('Artículo no encontrado');

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'posts',
    });

    try {
      if (post.cover_image_public_id) {
        await cloudinary.uploader.destroy(post.cover_image_public_id).catch(() => {});
      }

      const updatedPost = await postRepository.update(post_id, {
        cover_image_url: result.secure_url,
        cover_image_public_id: result.public_id,
      });

      if (!updatedPost) {
        throw new Error('No se pudo actualizar la imagen del artículo');
      }

      return updatedPost;
    } finally {
      await fs.unlink(filePath).catch(() => {});
    }
  }

  async update(post_id: number, data: UpdatePostDTO): Promise<Post> {
    const existingPost = await postRepository.getById(post_id);
    if (!existingPost) throw new Error('Artículo no encontrado');

    const nextTitle = data.title ?? existingPost.title;
    const nextDescription = data.description ?? existingPost.description;

    const slug =
      data.title && data.title !== existingPost.title
        ? await this.generateUniqueSlug(data.title, post_id)
        : existingPost.slug;

    const meta_title = this.generateMetaTitle(nextTitle);
    const meta_description = this.generateMetaDescription(nextDescription);

    const updatedPost = await postRepository.update(post_id, {
      ...data,
      slug,
      meta_title,
      meta_description,
    });

    if (!updatedPost) throw new Error('Artículo no encontrado');

    return updatedPost;
  }

  async delete(post_id: number): Promise<boolean> {
    const post = await postRepository.getById(post_id);
    if (!post) throw new Error('Artículo no encontrado');

    if (post.cover_image_public_id) {
      await cloudinary.uploader.destroy(post.cover_image_public_id).catch(() => {});
    }

    const deleted = await postRepository.delete(post_id);
    if (!deleted) throw new Error('Artículo no encontrado');

    return deleted;
  }
}

export default new PostService();
