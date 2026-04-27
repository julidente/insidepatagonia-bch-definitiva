// src/patterns/strategy/strategy.mapper.ts
import { ISortStrategy } from './sortStrategy.interface';
import * as Strategies from './indexStrategy';

export const strategyMap: Record<string, new () => ISortStrategy> = {
  priceAsc: Strategies.SortByPriceAsc,
  priceDesc: Strategies.SortByPriceDesc,
  name: Strategies.SortByName,
};
