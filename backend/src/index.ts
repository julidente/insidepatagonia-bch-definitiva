// src/index.ts

/* import 'dotenv/config'; // <-- Asegúrate de poder leer las variables del .env
import app from './app';
import { connectDB, sequelize } from './config/database.config';

const PORT = process.env.PORT || 3001; // por defecto 3001 si no hay variable

(async () => {
  try {
    console.log('🧩 Conectando a la base de datos...');
    await connectDB();

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1); // salir con error si no puede iniciar
  }
})(); */

// src/index.ts
/* import 'dotenv/config';
import app from './app';
import { Database } from './config/database.config'; // Usa la clase Database

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    console.log('🧩 Conectando a la base de datos...');
    await Database.connect(); // 👈 Llama al método del Singleton

    const sequelize = Database.getInstance(); // 👈 Obtén la instancia única

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
})(); */

// src/index.ts
import 'dotenv/config';
import app from './app';
import { Database } from './config/database.config';

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    console.log('🧩 Conectando a la base de datos...');
    await Database.connect(); // Inicializa la conexión

    // 🔹 Sincronizar todas las entidades con la DB
    //await sequelize.sync({ alter: true });
    //console.log("✅ Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
})();
