// src/models/entity/category.entity.ts
/* import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";
import { Activity } from "./activity.entity"; // suponer que ya existe

export class Category extends Model {
  public category_id!: number;
  public name!: string;
  public description!: string;
}

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Categories",
    timestamps: true,
  }
);

// Relación 1:N con Activity
Category.hasMany(Activity, { foreignKey: "category_id", as: "activities" }); */

// src/models/entity/category.entity.ts
// sin asociaciones, se hacen en index.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';

export class Category extends Model {
  public category_id!: number;
  public name!: string;
  public description!: string;
}

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'Categories',
    timestamps: true,
  },
);
