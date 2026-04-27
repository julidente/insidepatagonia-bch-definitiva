// src/patterns/strategy/sortByName.strategy.ts
import { ISortStrategy } from './sortStrategy.interface';
import { Activity } from '../../models/entity/activity.entity';

export class SortByName implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => a.name.localeCompare(b.name));
  }
}
