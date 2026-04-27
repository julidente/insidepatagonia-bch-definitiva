/* import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Definimos el tipo usando ReturnType e inferencia

// Parameters<typeof swaggerJSDoc>[0] obtiene el tipo del primer parámetro que recibe la función swaggerJSDoc,
//es decir, exactamente el tipo de options que espera, sin depender de un namespace inexistente ni de un tipo exportado.
const options: Parameters<typeof swaggerJSDoc>[0] = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Backend - Express + TypeScript',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // ajusta la ruta si tus rutas están en otra carpeta
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('✅ Swagger disponible en http://localhost:3001/api-docs');
};
 */

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Usamos inferencia de tipos para evitar el error "Cannot find namespace" o "no exported member"
const options: Parameters<typeof swaggerJSDoc>[0] = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Backend - Express + TypeScript',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Cambia si usas proxy o variable de entorno
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          // nombre que usarás en "security" de las rutas
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Ajusta si tus rutas están en otro directorio
};

// Genera el documento OpenAPI
const swaggerSpec = swaggerJSDoc(options);

// Función que monta la ruta /api-docs en tu app Express
export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('✅ Swagger disponible en http://localhost:3001/api-docs');
};
