// src/middlewares/auth.middleware.ts
/* import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayloadCustom {
  user_id: number;
  role: 'ADMIN' | 'USER';
}

// Asegúrate de tener una clave secreta en .env
const JWT_SECRET: string = process.env.JWT_SECRET ?? 'super_secret_key';

// Extendemos Request para que tenga el usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    role: 'ADMIN' | 'USER';
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Validamos que venga el header
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  // Validamos que token no sea undefined
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadCustom & {
      user_id: number;
      role: 'ADMIN' | 'USER';
    };

    // Validamos que contenga user_id y role
    if (!decoded.user_id || !decoded.role) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Asignamos la info del usuario al request
    req.user = {
      user_id: decoded.user_id,
      role: decoded.role,
    };

    next(); // Pasamos al siguiente middleware / ruta
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}; */

// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Payload esperado del JWT
interface JwtPayloadCustom {
  user_id: number;
}

// Clave secreta (desde .env o valor por defecto)
const JWT_SECRET: string = process.env.JWT_SECRET ?? 'super_secret_key';

// Extendemos Request para que tenga la info del usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    user_id: number;
  };
}

// Middleware para autenticar JWT
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Validamos que venga el header con Bearer
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;

    if (!decoded.user_id) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Asignamos la info del usuario al request
    req.user = { user_id: decoded.user_id };

    next(); // Pasamos al siguiente middleware / ruta
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
