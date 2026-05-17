export interface ActivityImage {
  image_id: number;
  url: string;
  public_id: string;
  is_cover: boolean;
  activity_id: number;
}

export interface AvailableDate {
  available_date_id: number;
  start_date: string;
  end_date: string;
  activity_id: number;
}

export interface Activity {
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

  price?: number | string | null;
  price_currency?: string | null;
  price_additional_info?: string | null;

  images?: ActivityImage[] | null;
  availableDates?: AvailableDate[] | null;
}

export interface ActivityCreate {
  name: string;
  summary?: string;
  description?: string;
  location: string;

  has_multiple_meeting_points: boolean;
  meeting_point_1?: string;
  meeting_point_2?: string;

  activity_type: string;
  duration_hours?: number | null;

  has_additional_cost?: boolean;
  additional_cost?: string;
  includes?: string;
  not_includes?: string;
  what_you_will_do?: string;

  accommodation_detail?: string;
  transfer_detail?: string;

  important_info?: string;
  tips?: string;

  technical_difficulty?: string;
  effort_level?: string;

  distance?: string;

  activity_days?: number | null;
  accommodation_days?: number | null;

  accommodation_type?: string;
  transport_type?: string;

  price?: number | null;
  price_currency?: string | null;
  price_additional_info?: string;

  availableDates?: {
    start_date: string;
    end_date: string;
  }[];
}

export type ActivityUpdate = Partial<ActivityCreate>;