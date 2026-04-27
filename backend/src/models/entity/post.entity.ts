import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database.config';
import { IPost } from '../post.model';

interface PostCreationAttributes extends Optional<IPost, 'post_id'> {}

export class Post extends Model<IPost, PostCreationAttributes> implements IPost {
  public post_id!: number;
  public title!: string;
  public slug!: string;
  public description!: string;
  public cover_image_url!: string | null;
  public cover_image_public_id!: string | null;
  public is_published!: boolean;
  public meta_title!: string;
  public meta_description!: string;
}

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    cover_image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    cover_image_public_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    is_published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    meta_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    meta_description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Posts',
    timestamps: true,
  },
);
