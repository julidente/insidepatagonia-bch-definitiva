// src/models/entity/province.entity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';

export class Province extends Model {
  public province_id!: number;
  public name!: string;
}

Province.init(
  {
    province_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Provinces',
    timestamps: true,
  },
);
