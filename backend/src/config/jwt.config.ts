const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

export const jwtConfig = {
  secret: jwtSecret,
  expiresIn: process.env.JWT_EXPIRES_IN ?? '4h',
};
