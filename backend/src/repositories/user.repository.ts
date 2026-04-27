// src/repositories/user.repository.ts
import { User } from '../models/entity/user.entity';

export class UserRepository {
  async getAll() {
    return await User.findAll({ attributes: ['user_id', 'name', 'email'] });
  }

  async getById(user_id: number) {
    return await User.findByPk(user_id, { attributes: ['user_id', 'name', 'email'] });
  }

  async getByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async create(data: { name: string; email: string; password_hash: string }) {
    return await User.create(data);
  }

  async update(user_id: number, data: { name?: string; email?: string; password_hash?: string }) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    return await user.update(data);
  }

  async delete(user_id: number) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    await user.destroy();
    return user;
  }
}

export default new UserRepository();
