/* import request from 'supertest';
import app from '../../app'; // Asegúrate que este sea el path correcto
import AuthService from '../../services/auth.service';

// Mock completo del AuthService
jest.mock('../../services/auth.service');

describe('POST /auth/login', () => {
  const mockUser = {
    user_id: 1,
    name: 'Admin',
    email: 'admin@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe hacer login exitoso y devolver token', async () => {
    (AuthService.validateUser as jest.Mock).mockResolvedValue(mockUser);
    (AuthService.generateToken as jest.Mock).mockResolvedValue('mocked-jwt-token');

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: '123456',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login exitoso');
    expect(res.body.token).toBe('mocked-jwt-token');
    expect(res.body.user).toEqual({
      user_id: 1,
      name: 'Admin',
      email: 'admin@example.com',
    });

    expect(AuthService.validateUser).toHaveBeenCalledWith(
      'admin@example.com',
      '123456'
    );
    expect(AuthService.generateToken).toHaveBeenCalledWith(mockUser);
  });

  test('Debe retornar 401 si las credenciales son inválidas', async () => {
    (AuthService.validateUser as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'wrong@example.com',
        password: 'wrong',
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: 'Credenciales inválidas' });
  });

  test('Debe retornar 500 si ocurre un error interno', async () => {
    (AuthService.validateUser as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: '123456',
      });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Error interno del servidor' });
  });
}); */

/* import request from 'supertest';
import app from '../../test-app';
import  AuthService  from '../../services/auth.service';

// Mockeamos AuthService para no tocar la DB
jest.mock('../../services/auth.service');

describe('POST /auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe hacer login exitoso y devolver token', async () => {
    // Mock de la función validateUser
    (AuthService.validateUser as jest.Mock).mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@test.com',
    });

    // Mock del token
    (AuthService.generateToken as jest.Mock).mockReturnValue('mocked-jwt-token');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login exitoso');
    expect(res.body.token).toBe('mocked-jwt-token');
  });

  test('Debe retornar 401 si las credenciales son inválidas', async () => {
    (AuthService.validateUser as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@test.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  test('Debe retornar 500 si ocurre un error interno', async () => {
    (AuthService.validateUser as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error interno');
  });
}); */

// src/tests/unit/auth.test.ts
import request from 'supertest';
import app from '../../test-app';
import AuthService from '../../services/auth.service';

jest.mock('../../services/auth.service'); // Mock global de AuthService

describe('POST /auth/login', () => {
  const mockUser = {
    user_id: 1,
    name: 'Test User',
    email: 'test@test.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe hacer login exitoso y devolver token', async () => {
    (AuthService.validateUser as jest.Mock).mockResolvedValue(mockUser);
    (AuthService.generateToken as jest.Mock).mockResolvedValue('mocked-jwt-token');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login exitoso');
    expect(res.body.token).toBe('mocked-jwt-token');
    expect(res.body.user).toEqual(mockUser);
  });

  test('Debe retornar 401 si las credenciales son inválidas', async () => {
    (AuthService.validateUser as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@test.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  test('Debe retornar 500 si ocurre un error interno', async () => {
    (AuthService.validateUser as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error interno del servidor'); // Coincide con tu controller
  });
});
