import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from './user.service';
import { jwtConfig } from '../config/jwt.config';
import { User } from '../models/entity/user.entity';

class AuthService {
  async validateUser(email: string, password: string) {
    const user = await userService.getByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password_hash);
    return isValid ? user : null;
  }

  async generateToken(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { user_id: user.user_id },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn },
        (err: Error | null, token?: string) => {
          if (err || !token) return reject(err);
          resolve(token);
        },
      );
    });
  }
}

export default new AuthService();
