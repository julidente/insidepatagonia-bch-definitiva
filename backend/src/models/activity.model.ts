/* // src/models/activity.model.ts
export interface IActivity {
  activity_id: number;
  name: string;
  description?: string;
  city_id: number;
  
  // se puede agregar más campos como fecha, precio, etc.
} */

// src/models/activity.model.ts
export interface IActivity {
  activity_id: number;
  name: string;
  summary?: string | null;
  description?: string | null;
  location: string;

  has_multiple_meeting_points: boolean;
  meeting_point_1?: string | null;
  meeting_point_2?: string | null;

  activity_type: string;
  duration_hours?: number | null;

  has_additional_cost?: boolean;
  additional_cost?: string | null;
  includes?: string | null;
  not_includes?: string | null;
  what_you_will_do?: string | null;

  accommodation_detail?: string | null;
  transfer_detail?: string | null;

  important_info?: string | null;
  tips?: string | null;

  technical_difficulty?: string | null;
  effort_level?: string | null;

  distance?: string | null;

  activity_days?: number | null;
  accommodation_days?: number | null;

  accommodation_type?: string | null;
  transport_type?: string | null;

  price: number;
  price_currency: string;
  price_additional_info?: string | null;
}
