export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? 'super_secret_key',
  expiresIn: '4h', // Cambia esto según tus necesidades, por ejemplo '1h' para 1 hora
};
