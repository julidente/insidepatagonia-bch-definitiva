import { Post } from '../models/entity/post.entity';
import { IPost } from '../models/post.model';

export class PostRepository {
  async getAll(): Promise<Post[]> {
    return await Post.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async getPublished(): Promise<Post[]> {
    return await Post.findAll({
      where: { is_published: true },
      order: [['createdAt', 'DESC']],
    });
  }

  async getById(post_id: number): Promise<Post | null> {
    return await Post.findByPk(post_id);
  }

  async getBySlug(slug: string): Promise<Post | null> {
    return await Post.findOne({
      where: { slug, is_published: true },
    });
  }

  async getAnyBySlug(slug: string): Promise<Post | null> {
    return await Post.findOne({
      where: { slug },
    });
  }

  async create(data: Omit<IPost, 'post_id'>): Promise<Post> {
    return await Post.create(data as any);
  }

  async update(post_id: number, data: Partial<Omit<IPost, 'post_id'>>): Promise<Post | null> {
    const post = await Post.findByPk(post_id);
    if (!post) return null;

    return await post.update(data);
  }

  async delete(post_id: number): Promise<boolean> {
    const post = await Post.findByPk(post_id);
    if (!post) return false;

    await post.destroy();
    return true;
  }
}

export default new PostRepository();
