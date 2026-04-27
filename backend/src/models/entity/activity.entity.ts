// src/models/entity/activity.entity.ts
/* import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";
import { City } from "./city.entity";
import { Category } from "./category.entity";
import { Image } from "./image.entity"; // suponer que luego creamos
import { Subscription } from "./subscription.entity"; // suponer que luego creamos

export class Activity extends Model {
  public activity_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public discount!: number;
  public rating!: number;
  public location!: string;
  public city_id!: number;
}

Activity.init(
  {
    activity_id: {
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    },
    
  },
  {
    sequelize,
    tableName: "Activities",
    timestamps: true,
  }
);

// Relaciones
Activity.belongsTo(City, { foreignKey: "city_id", as: "city" });
Activity.hasMany(Image, { foreignKey: "activity_id", as: "images" });
Activity.hasMany(Subscription, { foreignKey: "activity_id", as: "subscriptions" }); */

// src/models/entity/activity.entity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';

export class Activity extends Model {
  public activity_id!: number;
  public name!: string;
  public summary!: string | null;
  public description!: string | null;
  public location!: string;

  public has_multiple_meeting_points!: boolean;
  public meeting_point_1!: string | null;
  public meeting_point_2!: string | null;

  public activity_type!: string;
  public duration_hours!: number | null;

  public has_additional_cost!: boolean;
  public additional_cost!: string | null;
  public includes!: string | null;
  public not_includes!: string | null;
  public what_you_will_do!: string | null;

  public accommodation_detail!: string | null;
  public transfer_detail!: string | null;

  public important_info!: string | null;
  public tips!: string | null;

  public technical_difficulty!: string | null;
  public effort_level!: string | null;

  public distance!: string | null;

  public activity_days!: number | null;
  public accommodation_days!: number | null;

  public accommodation_type!: string | null;
  public transport_type!: string | null;

  public price!: number;
  public price_currency!: string;
  public price_additional_info!: string | null;
}

Activity.init(
  {
    activity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    summary: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    has_multiple_meeting_points: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    meeting_point_1: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    meeting_point_2: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    activity_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    duration_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    has_additional_cost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    additional_cost: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    includes: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    not_includes: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    what_you_will_do: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    accommodation_detail: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    transfer_detail: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    important_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    tips: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    technical_difficulty: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    effort_level: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    distance: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    activity_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    accommodation_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    accommodation_type: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    transport_type: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    price_currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    price_additional_info: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Activities',
    timestamps: true,
  },
);
