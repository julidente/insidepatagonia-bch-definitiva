// src/app.ts
import express from 'express';
import path from 'path';
import cors from 'cors';
import activitiesRoutes from './routes/activity.routes';
import userRoutes from './routes/user.routes';
import imagesRoutes from './routes/image.routes';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/posts', postRoutes);

export default app;
