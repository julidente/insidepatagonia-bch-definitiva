//Entity (o Model de Sequelize) → Define la estructura de la tabla,
// columnas y tipos de datos en la base de datos, así como relaciones. Por ejemplo: City como entidad.

/* // src/models/entity.city.entity.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";

export class City extends Model {
  public city_id!: number;
  public name!: string;
  public province_id!: number;
}

City.init(
  {
    city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //luego lo ponemos en false cuando el seeder tenga province_id
    },
  },
  {
    sequelize,
    tableName: "Cities",
    timestamps: true, // si no usás createdAt/updatedAt false, sino true
  }
); */

// src/models/entity/city.entity.ts
/* import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";
import { Province } from "./province.entity";

export class City extends Model {
  public city_id!: number;
  public name!: string;
  public province_id!: number;
}

City.init(
  {
    city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Cities",
    timestamps: true,
  }
);

// Definir la relación: cada City pertenece a una Province
City.belongsTo(Province, { foreignKey: "province_id", as: "province" });
// Si querés que Province tenga muchas Cities:
Province.hasMany(City, { foreignKey: "province_id", as: "cities" }); */

// src/models/entity/city.entity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';
import { ICity } from '../city.model';
import { Province } from './province.entity';

export class City extends Model {
  public city_id!: number;
  public name!: string;
  public province_id!: number;

  // -------------------
  // Asociaciones
  // -------------------
  public province?: Province; //opcional (para el strategy)
}

// export class City extends Model<ICity> implements ICity {
//   public city_id!: number;
//   public name!: string;
//   public province_id!: number;
// }

City.init(
  {
    city_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    province_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: 'Cities', timestamps: true },
);
