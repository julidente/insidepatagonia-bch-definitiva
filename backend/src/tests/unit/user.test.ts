// src/tests/unit/user.test.ts
/* import request from 'supertest';
import app from '../../test-app';
import userService from '../../services/user.service';

jest.mock('../../services/user.service');

describe('Usuarios', () => {
  const mockUsers = [
    { user_id: 1, name: 'Juan', email: 'juan@example.com' },
    { user_id: 2, name: 'Ana', email: 'ana@example.com' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/users - debe retornar todos los usuarios', async () => {
    (userService.getAll as jest.Mock).mockResolvedValue(mockUsers);

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers);
    expect(userService.getAll).toHaveBeenCalledTimes(1);
  });

  it('GET /api/users/:id - debe retornar usuario por id', async () => {
    const user = mockUsers[0]!;
    (userService.getById as jest.Mock).mockResolvedValue(user);

    const res = await request(app).get(`/api/users/${user.user_id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
    expect(userService.getById).toHaveBeenCalledWith(user.user_id);
  });

  it('POST /api/users - debe crear un usuario', async () => {
    const newUser = { name: 'Pedro', email: 'pedro@example.com', password: '123456' };
    const createdUser = { user_id: 3, name: 'Pedro', email: 'pedro@example.com' };
    (userService.create as jest.Mock).mockResolvedValue(createdUser);

    const res = await request(app).post('/api/users').send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdUser);
    expect(userService.create).toHaveBeenCalledWith(newUser);
  });
}); */

// src/tests/unit/user.test.ts
/* import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../test-app';
import userService from '../../services/user.service';

jest.mock('../../services/user.service');

describe('Usuarios', () => {
  // Mock de usuarios directamente en el test
  const mockUsers = [
    { user_id: 1, name: 'Juan Perez', email: 'juan@example.com', password: 'secret123' },
    { user_id: 2, name: 'Maria Lopez', email: 'maria@example.com', password: 'password456' },
  ];

  // Token JWT de prueba
  const testUser = { user_id: 1, name: 'Juan Perez', email: 'juan@example.com' };
  const jwtSecret = process.env.JWT_SECRET || 'testsecret';
  const token = jwt.sign(testUser, jwtSecret, { expiresIn: '1h' });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/users/:id - debe retornar usuario por id', async () => {
    const user = mockUsers[0]!;
    (userService.getById as jest.Mock).mockResolvedValue(user);

    const res = await request(app)
      .get(`/api/users/${user.user_id}`)
      .set('Authorization', `Bearer ${token}`); // Si tu endpoint GET /:id no requiere JWT, puedes quitar esta línea

    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
    expect(userService.getById).toHaveBeenCalledWith(user.user_id);
  });

  it('PUT /api/users/:id - debe actualizar usuario (protegido con JWT)', async () => {
    const user = mockUsers[0]!;
    const updatedUser = { ...user, name: 'Juan Actualizado' };
    (userService.update as jest.Mock).mockResolvedValue(updatedUser);

    const res = await request(app)
      .put(`/api/users/${user.user_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Juan Actualizado' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedUser);
    expect(userService.update).toHaveBeenCalledWith(user.user_id, { name: 'Juan Actualizado' });
  });

  it('DELETE /api/users/:id - debe eliminar usuario (protegido con JWT)', async () => {
    const user = mockUsers[1]!;
    (userService.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app)
      .delete(`/api/users/${user.user_id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Usuario eliminado correctamente');
    expect(userService.delete).toHaveBeenCalledWith(user.user_id);
  });

  it('POST /api/users - debe crear un usuario', async () => {
    const newUser = { name: 'Pedro', email: 'pedro@example.com', password: '123456' };
    const createdUser = { user_id: 3, name: 'Pedro', email: 'pedro@example.com' };
    (userService.create as jest.Mock).mockResolvedValue(createdUser);

    const res = await request(app).post('/api/users').send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdUser);
    expect(userService.create).toHaveBeenCalledWith(newUser);
  });
}); */

// src/tests/unit/user.test.ts
import request from 'supertest';
import app from '../../test-app';
import userService from '../../services/user.service';

// Mock del servicio de usuarios
jest.mock('../../services/user.service');

// Mock del middleware de autenticación para que siempre llame a next()
jest.mock('../../middlewares/auth.middleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next(),
}));

describe('Usuarios', () => {
  // Mock de usuarios directamente en el test
  const mockUsers = [
    { user_id: 1, name: 'Juan Perez', email: 'juan@example.com', password: 'secret123' },
    { user_id: 2, name: 'Maria Lopez', email: 'maria@example.com', password: 'password456' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/users/:id - debe retornar usuario por id', async () => {
    const user = mockUsers[0]!;
    (userService.getById as jest.Mock).mockResolvedValue(user);

    const res = await request(app).get(`/api/users/${user.user_id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
    expect(userService.getById).toHaveBeenCalledWith(user.user_id);
  });

  it('PUT /api/users/:id - debe actualizar usuario', async () => {
    const user = mockUsers[0]!;
    const updatedUser = { ...user, name: 'Juan Actualizado' };
    (userService.update as jest.Mock).mockResolvedValue(updatedUser);

    const res = await request(app)
      .put(`/api/users/${user.user_id}`)
      .send({ name: 'Juan Actualizado' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedUser);
    expect(userService.update).toHaveBeenCalledWith(user.user_id, { name: 'Juan Actualizado' });
  });

  it('DELETE /api/users/:id - debe eliminar usuario', async () => {
    const user = mockUsers[1]!;
    (userService.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete(`/api/users/${user.user_id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Usuario eliminado correctamente');
    expect(userService.delete).toHaveBeenCalledWith(user.user_id);
  });

  it('POST /api/users - debe crear un usuario', async () => {
    const newUser = { name: 'Pedro', email: 'pedro@example.com', password: '123456' };
    const createdUser = { user_id: 3, name: 'Pedro', email: 'pedro@example.com' };
    (userService.create as jest.Mock).mockResolvedValue(createdUser);

    const res = await request(app).post('/api/users').send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdUser);
    expect(userService.create).toHaveBeenCalledWith(newUser);
  });

  it('GET /api/users - debe retornar todos los usuarios', async () => {
    (userService.getAll as jest.Mock).mockResolvedValue(mockUsers);

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers);
    expect(userService.getAll).toHaveBeenCalled();
  });
});
