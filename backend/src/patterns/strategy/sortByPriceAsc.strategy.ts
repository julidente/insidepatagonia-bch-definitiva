// src/patterns/strategy/sortByPriceAsc.strategy.ts
import { ISortStrategy } from './sortStrategy.interface';
import { Activity } from '../../models/entity/activity.entity';

export class SortByPriceAsc implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => Number(a.price) - Number(b.price));
  }
}
