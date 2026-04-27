// temporal para que no de error en activity
// src/models/entity/image.entity.ts
/* import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config";

export class Image extends Model {
  public image_id!: number;
  public url!: string;
  public activity_id!: number;
}

Image.init(
  {
    image_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
    activity_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "Images",
    timestamps: true,
  }
); */

// src/models/entity/image.entity.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../config/database.config';
import { IImage } from '../image.model';

// Campos opcionales al crear
interface ImageCreationAttributes extends Optional<IImage, 'image_id' | 'is_cover'> {}

export class Image extends Model<IImage, ImageCreationAttributes> implements IImage {
  public image_id!: number;
  public url!: string;
  public public_id!: string;
  public is_cover!: boolean;
  public activity_id!: number;
}

Image.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    public_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    is_cover: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Images',
    timestamps: true,
  },
);
