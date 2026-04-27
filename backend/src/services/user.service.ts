// src/services/user.service.ts
import bcrypt from 'bcrypt';
import userRepository from '../repositories/user.repository';

export class UserService {
  async getAll() {
    return await userRepository.getAll();
  }

  async getById(user_id: number) {
    const user = await userRepository.getById(user_id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }

  async getByEmail(email: string) {
    return await userRepository.getByEmail(email);
  }

  async create(data: { name: string; email: string; password: string }) {
    const existing = await userRepository.getByEmail(data.email);
    if (existing) throw new Error('El email ya está registrado');

    const password_hash = await bcrypt.hash(data.password, 10);
    return await userRepository.create({
      name: data.name,
      email: data.email,
      password_hash,
    });
  }

  async update(user_id: number, data: { name?: string; email?: string; password?: string }) {
    const user = await userRepository.getById(user_id);
    if (!user) throw new Error('Usuario no encontrado');

    const updatedData: any = { ...data };
    if (data.password) {
      updatedData.password_hash = await bcrypt.hash(data.password, 10);
      delete updatedData.password;
    }

    return await user.update(updatedData);
  }

  async delete(user_id: number) {
    const deleted = await userRepository.delete(user_id);
    if (!deleted) throw new Error('Usuario no encontrado');
    return deleted;
  }
}

export default new UserService();
