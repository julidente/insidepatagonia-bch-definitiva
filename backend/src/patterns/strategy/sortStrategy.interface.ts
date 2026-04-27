// src/patterns/strategy/sortStrategy.interface.ts
import { Activity } from '../../models/entity/activity.entity';

export interface ISortStrategy {
  sort(activities: Activity[]): Activity[];
}
