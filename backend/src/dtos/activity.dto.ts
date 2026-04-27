// src/dtos/activity.dto.ts
import { IActivity } from '../models/activity.model';

export interface AvailableDateDTO {
  start_date: string;
  end_date: string;
}

export interface CreateActivityDTO extends Omit<IActivity, 'activity_id'> {
  availableDates?: AvailableDateDTO[];
}

export interface UpdateActivityDTO extends Partial<Omit<IActivity, 'activity_id'>> {
  availableDates?: AvailableDateDTO[];
}
