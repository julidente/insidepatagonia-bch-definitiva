import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.config';

export class AvailableDate extends Model {
  public available_date_id!: number;
  public start_date!: string;
  public end_date!: string;
  public activity_id!: number;
}

AvailableDate.init(
  {
    available_date_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'AvailableDates',
    timestamps: true,
  },
);
