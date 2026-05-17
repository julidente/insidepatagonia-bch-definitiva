// src/patterns/strategy/sortByPriceDesc.strategy.ts
import { ISortStrategy } from './sortStrategy.interface';
import { Activity } from '../../models/entity/activity.entity';

const getPriceOrNull = (activity: Activity) => {
  const price = activity.price;

  if (price === null || price === undefined) {
    return null;
  }

  const numericPrice = Number(price);

  return Number.isFinite(numericPrice) ? numericPrice : null;
};

export class SortByPriceDesc implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => {
      const priceA = getPriceOrNull(a);
      const priceB = getPriceOrNull(b);

      if (priceA === null && priceB === null) return 0;
      if (priceA === null) return 1;
      if (priceB === null) return -1;

      return priceB - priceA;
    });
  }
}
