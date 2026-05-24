
##  Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)  
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

##  Cómo Usar el Proyecto

### 1. Configuración de Entorno

Crear un archivo .env en la carpeta backend/ con el siguiente contenido:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$IXOCTjN19Cmw1fPBwytvl.xWxFukyFrFDSoI.lUjVAdkwIyqp9DpW
ADMIN_PASSWORD_SIN_HASH=123456
JWT_SECRET=mi_clave_secreta_segura
JWT_EXPIRES_IN=1h
```

### 2. Levantar los Contenedores con Docker

Primero, construir y levantar los contenedores:

```bash
docker-compose build
docker-compose up -d
```

Luego, ingresar al contenedor del backend para ejecutar las migraciones y los seeders:

```bash
docker-compose exec backend sh

# Dentro del contenedor:
npx sequelize-cli db:migrate ( en el de la guiTuristica no es necesario se hace automaticamente las tablas)
npx sequelize-cli db:seed:all ( los seeders hay que hacerlos manualmente)
exit
```

##  Dependencias

###  Backend

- **cors**: Permite que el frontend (React) se comunique con el backend (Express) desde un dominio diferente (Cross-Origin Resource Sharing).
- **jsonwebtoken (JWT)**: Autenticación basada en tokens. Verifica la identidad del usuario en rutas protegidas.
- **bcryptjs**: Encripta contraseñas antes de guardarlas y las compara de forma segura durante el login.
- **dotenv**: Carga variables de entorno desde un archivo `.env` (claves secretas, puertos, datos de la base, etc.).
- **express**: Framework principal del backend. Define rutas, middleware y estructura la API RESTful.
- **joi**: Validación de datos avanzada para el cuerpo de las solicitudes (req.body).
- **sequelize**: ORM que facilita la interacción con PostgreSQL usando modelos en JavaScript.

---

###  Frontend

- **react**: Biblioteca base para construir interfaces de usuario en forma de componentes.
- **react-dom**: Monta la app React en el DOM del navegador (`ReactDOM.createRoot`, etc.).
- **react-hook-form**: Manejo eficiente de formularios con validación y mínimo re-renderizado.
- **react-query**: Manejo del estado de datos remotos (fetch, cache, sincronización automática).
- **react-router-dom**: Enrutamiento para aplicaciones SPA en React.

