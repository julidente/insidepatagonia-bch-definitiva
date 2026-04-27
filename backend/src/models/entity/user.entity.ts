/* import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';

export class User extends Model {
  public user_id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: 'ADMIN' | 'USER' | 'OPERATOR';
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER', 'OPERATOR'),
      defaultValue: 'USER',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
); */

// src/models/entity/user.entity.ts
/* import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";
import { IUser } from "../user.model";

export class User extends Model<IUser> implements IUser {
  public user_id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
}

User.init(
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "Users", timestamps: true }
); */

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database.config';
import { IUser } from '../user.model';

// Campos opcionales al crear un User
interface UserCreationAttributes extends Optional<IUser, 'user_id'> {}

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public user_id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
}

User.init(
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: 'Users', timestamps: true },
);
