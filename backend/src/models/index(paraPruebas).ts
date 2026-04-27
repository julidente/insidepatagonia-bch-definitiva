import { sequelize } from '../config/database.config';
import { City } from './entity/city.entity';

export const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a DB correcta');

    // Esto crea la tabla si no existe
    await City.sync({ force: false });
    console.log('✅ Tabla City sincronizada');
  } catch (err) {
    console.error('❌ Error al inicializar modelos:', err);
  }
};
