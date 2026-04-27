// src/models/entity/index.ts
import { sequelize } from '../../config/database.config';
import { Activity } from './activity.entity';
import { Image } from './image.entity';
import { AvailableDate } from './availableDate.entity';
import { Post } from './post.entity';
// -----------------
// Asociaciones
// -----------------

// Activity 1:N Image
Activity.hasMany(Image, {
  foreignKey: 'activity_id',
  as: 'images',
  onDelete: 'CASCADE',
});

Image.belongsTo(Activity, {
  foreignKey: 'activity_id',
  as: 'activity',
});

// Activity 1:N AvailableDate
Activity.hasMany(AvailableDate, {
  foreignKey: 'activity_id',
  as: 'availableDates',
  onDelete: 'CASCADE',
});

AvailableDate.belongsTo(Activity, {
  foreignKey: 'activity_id',
  as: 'activity',
});

export { sequelize, Activity, Image, AvailableDate };
