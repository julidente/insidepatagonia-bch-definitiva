// src/patterns/strategy/activitySorter.context.ts
import { Activity } from '../../models/entity/activity.entity';
import { ISortStrategy } from './sortStrategy.interface';

export class ActivitySorter {
  private strategy: ISortStrategy;

  constructor(strategy: ISortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ISortStrategy) {
    this.strategy = strategy;
  }

  sort(activities: Activity[]): Activity[] {
    return this.strategy.sort(activities);
  }
}
