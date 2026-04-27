// src/tests/unit/activity.test.ts
/* import request from 'supertest';
import app from '../../app'; // tu app de Express
import activityService from '../../services/activity.service';
import { Activity } from '../../models/entity/activity.entity';

jest.mock('../../services/activity.service');

const mockActivities: Activity[] = [
  {
    activity_id: 1,
    name: 'Parque Acuático',
    description: 'Diversión para toda la familia',
    price: 50,
    discount: 0,
    location: 'Ciudad A',
    category_id: 1,
    city_id: 1,
  } as Activity,
  {
    activity_id: 2,
    name: 'Museo de Arte',
    description: 'Exhibiciones de artistas locales',
    price: 20,
    discount: 5,
    location: 'Ciudad B',
    category_id: 2,
    city_id: 2,
  } as Activity,
];

describe('ActivityController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/activities - debe retornar todas las actividades', async () => {
    (activityService.getAll as jest.Mock).mockResolvedValue(mockActivities);

    const res = await request(app).get('/api/activities');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockActivities);
    expect(activityService.getAll).toHaveBeenCalled();
  });

  it('GET /api/activities/:id - debe retornar una actividad por id', async () => {
    const activity = mockActivities[0]!; // Non-null assertion
    (activityService.getById as jest.Mock).mockResolvedValue(activity);

    const res = await request(app).get(`/api/activities/${activity.activity_id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(activity);
    expect(activityService.getById).toHaveBeenCalledWith(activity.activity_id);
  });

  it('POST /api/activities - debe crear una nueva actividad', async () => {
    const newActivity = {
      name: 'Zoo',
      description: 'Animales exóticos',
      price: 30,
      discount: 0,
      location: 'Ciudad C',
      category_id: 3,
      city_id: 3,
    };
    (activityService.create as jest.Mock).mockResolvedValue({ activity_id: 3, ...newActivity });

    const res = await request(app).post('/api/activities').send(newActivity);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ activity_id: 3, ...newActivity });
    expect(activityService.create).toHaveBeenCalledWith(newActivity);
  });

  it('PUT /api/activities/:id - debe actualizar una actividad', async () => {
    const activity = mockActivities[0]!;
    const updatedActivity = { ...activity, name: 'Parque Acuático Renovado' };
    (activityService.update as jest.Mock).mockResolvedValue(updatedActivity);

    const res = await request(app)
      .put(`/api/activities/${activity.activity_id}`)
      .send({ name: 'Parque Acuático Renovado' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedActivity);
    expect(activityService.update).toHaveBeenCalledWith(activity.activity_id, {
      name: 'Parque Acuático Renovado',
    });
  });

  it('DELETE /api/activities/:id - debe eliminar una actividad', async () => {
    const activity = mockActivities[0]!;
    (activityService.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete(`/api/activities/${activity.activity_id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Actividad eliminada correctamente');
    expect(activityService.delete).toHaveBeenCalledWith(activity.activity_id);
  });
}); */

// src/tests/unit/activity.test.ts
/* import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import activityService from '../../services/activity.service';
import { Activity } from '../../models/entity/activity.entity';

jest.mock('../../services/activity.service');

const mockActivities: Activity[] = [
  {
    activity_id: 1,
    name: 'Parque Acuático',
    description: 'Diversión para toda la familia',
    price: 50,
    discount: 0,
    location: 'Ciudad A',
    category_id: 1,
    city_id: 1,
  } as Activity,
  {
    activity_id: 2,
    name: 'Museo de Arte',
    description: 'Exhibiciones de artistas locales',
    price: 20,
    discount: 5,
    location: 'Ciudad B',
    category_id: 2,
    city_id: 2,
  } as Activity,
];

// Token JWT de prueba
const testUser = { user_id: 1, name: 'Juan Perez', email: 'juan@example.com' };
const jwtSecret = process.env.JWT_SECRET || 'testsecret';
const token = jwt.sign(testUser, jwtSecret, { expiresIn: '1h' });

describe('ActivityController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/activities - debe retornar todas las actividades', async () => {
    (activityService.getAll as jest.Mock).mockResolvedValue(mockActivities);

    const res = await request(app).get('/api/activities');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockActivities);
    expect(activityService.getAll).toHaveBeenCalled();
  });

  it('GET /api/activities/:id - debe retornar una actividad por id', async () => {
    const activity = mockActivities[0]!;
    (activityService.getById as jest.Mock).mockResolvedValue(activity);

    const res = await request(app).get(`/api/activities/${activity.activity_id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(activity);
    expect(activityService.getById).toHaveBeenCalledWith(activity.activity_id);
  });

  it('POST /api/activities - debe crear una nueva actividad (protegido con JWT)', async () => {
    const newActivity = {
      name: 'Zoo',
      description: 'Animales exóticos',
      price: 30,
      discount: 0,
      location: 'Ciudad C',
      category_id: 3,
      city_id: 3,
    };
    (activityService.create as jest.Mock).mockResolvedValue({ activity_id: 3, ...newActivity });

    const res = await request(app)
      .post('/api/activities')
      .set('Authorization', `Bearer ${token}`)
      .send(newActivity);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ activity_id: 3, ...newActivity });
    expect(activityService.create).toHaveBeenCalledWith(newActivity);
  });

  it('PUT /api/activities/:id - debe actualizar una actividad (protegido con JWT)', async () => {
    const activity = mockActivities[0]!;
    const updatedActivity = { ...activity, name: 'Parque Acuático Renovado' };
    (activityService.update as jest.Mock).mockResolvedValue(updatedActivity);

    const res = await request(app)
      .put(`/api/activities/${activity.activity_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Parque Acuático Renovado' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedActivity);
    expect(activityService.update).toHaveBeenCalledWith(activity.activity_id, {
      name: 'Parque Acuático Renovado',
    });
  });

  it('DELETE /api/activities/:id - debe eliminar una actividad (protegido con JWT)', async () => {
    const activity = mockActivities[0]!;
    (activityService.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app)
      .delete(`/api/activities/${activity.activity_id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Actividad eliminada correctamente');
    expect(activityService.delete).toHaveBeenCalledWith(activity.activity_id);
  });
}); */

// src/tests/unit/activity.test.ts
import request from 'supertest';
import app from '../../app';
import activityService from '../../services/activity.service';
import { Activity } from '../../models/entity/activity.entity';

jest.mock('../../services/activity.service');

// Mock del middleware de autenticación para que siempre llame a next()
jest.mock('../../middlewares/auth.middleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next(),
}));

const mockActivities: Activity[] = [
  {
    activity_id: 1,
    name: 'Parque Acuático',
    description: 'Diversión para toda la familia',
    price: 50,
    discount: 0,
    location: 'Ciudad A',
    category_id: 1,
    city_id: 1,
  } as Activity,
  {
    activity_id: 2,
    name: 'Museo de Arte',
    description: 'Exhibiciones de artistas locales',
    price: 20,
    discount: 5,
    location: 'Ciudad B',
    category_id: 2,
    city_id: 2,
  } as Activity,
];

describe('ActivityController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/activities - debe retornar todas las actividades', async () => {
    (activityService.getAll as jest.Mock).mockResolvedValue(mockActivities);

    const res = await request(app).get('/api/activities');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockActivities);
    expect(activityService.getAll).toHaveBeenCalled();
  });

  it('GET /api/activities/:id - debe retornar una actividad por id', async () => {
    const activity = mockActivities[0]!;
    (activityService.getById as jest.Mock).mockResolvedValue(activity);

    const res = await request(app).get(`/api/activities/${activity.activity_id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(activity);
    expect(activityService.getById).toHaveBeenCalledWith(activity.activity_id);
  });

  it('POST /api/activities - debe crear una nueva actividad', async () => {
    const newActivity = {
      name: 'Zoo',
      description: 'Animales exóticos',
      price: 30,
      discount: 0,
      location: 'Ciudad C',
      category_id: 3,
      city_id: 3,
    };
    (activityService.create as jest.Mock).mockResolvedValue({ activity_id: 3, ...newActivity });

    const res = await request(app).post('/api/activities').send(newActivity);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ activity_id: 3, ...newActivity });
    expect(activityService.create).toHaveBeenCalledWith(newActivity);
  });

  it('PUT /api/activities/:id - debe actualizar una actividad', async () => {
    const activity = mockActivities[0]!;
    const updatedActivity = { ...activity, name: 'Parque Acuático Renovado' };
    (activityService.update as jest.Mock).mockResolvedValue(updatedActivity);

    const res = await request(app)
      .put(`/api/activities/${activity.activity_id}`)
      .send({ name: 'Parque Acuático Renovado' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedActivity);
    expect(activityService.update).toHaveBeenCalledWith(activity.activity_id, {
      name: 'Parque Acuático Renovado',
    });
  });

  it('DELETE /api/activities/:id - debe eliminar una actividad', async () => {
    const activity = mockActivities[0]!;
    (activityService.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete(`/api/activities/${activity.activity_id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Actividad eliminada correctamente');
    expect(activityService.delete).toHaveBeenCalledWith(activity.activity_id);
  });
});
