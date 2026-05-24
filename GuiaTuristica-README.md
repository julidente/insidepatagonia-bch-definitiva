# Guia turistica con Docker, Node.js, PostgreSQL y React



### 🎯 Arquitectura General
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx     │    │   React     │    │   Express   │
│  (Proxy)    │◄──►│ (Frontend)  │◄──►│  (Backend)  │
│   :80       │    │   :3000     │    │   :3001     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                   ┌─────────────┐    ┌─────────────┐
                   │    Redis    │    │ PostgreSQL  │
                   │  (Cache)    │    │    (DB)     │
                   │   :6379     │    │   :5432     │
                   └─────────────┘    └─────────────┘
```

### 🔧 Servicios del Sistema

| Servicio | Tecnología | Puerto | Función |
|----------|------------|--------|---------|
| **Frontend** | React 18 | 3000 | Interfaz de usuario |
| **Backend** | Express + Sequelize | 3001 | API REST |
| **Database** | PostgreSQL 15 | 5432 | Base de datos principal |
| **Cache** | Redis 7 | 6379 | Cache y sesiones |
| **Proxy** | Nginx | 80 | Reverse proxy |
| **pgAdmin** | pgAdmin 4 | 5050 | Administración de BD |



## Guia de instalacion

### 1. Agregar un .env al mismo nivel que este readme
```bash
### 
para poner en un .env en la carpeta guia turistica (mismo nivel que este readme):
# =====================================
# BASE DE DATOS POSTGRESQL
# =====================================
POSTGRES_DB=guia_turistica
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña

# =====================================
# BACKEND
# =====================================
NODE_ENV=development
PORT=3001
JWT_SECRET=mi_jwt_secret_guia_turistica

# Config DB (se pasan al contenedor backend)
DB_HOST=db
DB_PORT=5432
DB_NAME=guia_turistica
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# CORS
CORS_ORIGIN=http://localhost:3000

# =====================================
# FRONTEND
# =====================================
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development

CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
FAST_REFRESH=true
WDS_SOCKET_HOST=localhost
WDS_SOCKET_PORT=3000
WDS_SOCKET_PATH=/ws

# =====================================
# REDIS
# =====================================
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379

# =====================================
# PGADMIN
# =====================================
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_CONFIG_SERVER_MODE=False
PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False

# ========================
# BASE DE DATOS POSTGRESQL
# ========================
POSTGRES_DB=guia_turistica
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña

# ========================
# BACKEND
# ========================
NODE_ENV=development
PORT=3001
JWT_SECRET=mi_jwt_secret_guia_turistica

# Config DB (se pasan al contenedor backend)
DB_HOST=db
DB_PORT=5432
DB_NAME=guia_turistica
DB_USER=postgres
DB_PASSWORD=tu_contraseña
# CORS
CORS_ORIGIN=http://localhost:3000

# ========================
# ADMIN (lo usara el backend)
# ========================
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH='$2a$10$IXOCTjN19Cmw1fPBwytvl.xWxFukyFrFDSoI.lUjVAdkwIyqp9DpW'
JWT_EXPIRES_IN=4h

# ========================
# FRONTEND
# ========================
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
FAST_REFRESH=true
WDS_SOCKET_HOST=localhost
WDS_SOCKET_PORT=3000
WDS_SOCKET_PATH=/ws

# ========================
# REDIS
# ========================
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379

# ========================
# PGADMIN
# ========================
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_CONFIG_SERVER_MODE=False
PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False
```

### 2. Agregar un .env.test dentro de la carpeta backend
```bash
# Database (aunque no se use realmente si mockeas el servicio)
DB_NAME=testdb
DB_USER=testuser
DB_PASSWORD=testpass
DB_HOST=localhost
DB_PORT=5432

# JWT
JWT_SECRET=testsecret
JWT_EXPIRES_IN=1h

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$hash_ficticio_para_tests
```

### 3. Levantar los Contenedores con Docker

Entrar en la carpeta con el .yml:
```bash
cd '.\Guia Turistica\'
```
Primero, construir y levantar los contenedores:

```bash
docker-compose build
docker-compose up -d
```

Agregamos las dependencias en el backend:
vamos al backend con cd  y luego:
```bash
npm install
```

para ver si el backend funciona correctamente hacemos un log
```bash
docker-compose logs backend
```

### 4. Preparar las bases de datos 
Luego, ingresar al contenedor del backend para ejecutar las migraciones y los seeders:

```bash
docker-compose exec backend sh

# Dentro del contenedor:
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
exit
```

### 5. Revisar contenido de la base de datos
Si uno quiere ingresar para ver las tablas de la base de datos:
```bash
docker exec -it guia_db psql -U postgres -d guia_turistica

# Dentro de la bd:
#mostrar tablas
\dt  

 select * "nombre de la tabla"; #para ver contenido

\q #para salir
```

## Dependencias

## 📦 Dependencias del Backend

- **axios**: Cliente HTTP para realizar peticiones a servicios externos.  
- **bcrypt**: Encripta contraseñas de forma segura para el registro y login.  
- **cors**: Permite que el frontend se comunique con el backend desde otro dominio (Cross-Origin Resource Sharing).  
- **jsonwebtoken**: Implementa autenticación mediante tokens JWT.    
- **swagger-ui-express**: Expone la documentación Swagger en una ruta del backend.  
- **zod**: Valida datos de entrada mediante esquemas tipados.  
- **sequelize**: ORM que facilita la interacción con PostgreSQL usando modelos en JavaScript/TypeScript.  

## 🛠️ Dependencias de Desarrollo

- **husky**: Ejecuta hooks de Git como pre-commit y pre-push para asegurar calidad.  
- **eslint**: Linter que detecta errores y aplica buenas prácticas en el código.  
- **prettier**: Formateador automático que mantiene un estilo de código consistente.  
- **typescript**: Lenguaje de tipado estático que mejora la robustez del backend.  
- **jest**: Framework para realizar pruebas unitarias y de integración.
