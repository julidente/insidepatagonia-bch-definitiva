import { Activity } from '../../models/entity/activity.entity';
import { AvailableDate } from '../../models/entity/availableDate.entity';
import { ISortStrategy } from './sortStrategy.interface';

export class SortByStartDateDesc implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => {
      const dateA = this.getEarliestStartDate(a);
      const dateB = this.getEarliestStartDate(b);

      return dateB - dateA;
    });
  }

  private getEarliestStartDate(activity: Activity): number {
    const availableDates = activity.get('availableDates') as AvailableDate[] | undefined;

    if (!availableDates || availableDates.length === 0) {
      return Number.MIN_SAFE_INTEGER;
    }

    const timestamps = availableDates
      .map((date) => new Date(`${date.start_date}T00:00:00`).getTime())
      .filter((timestamp) => Number.isFinite(timestamp));

    if (timestamps.length === 0) {
      return Number.MIN_SAFE_INTEGER;
    }

    return Math.min(...timestamps);
  }
}
