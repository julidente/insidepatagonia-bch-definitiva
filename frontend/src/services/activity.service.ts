import { apiClient } from "./apiClient";
import { Activity, ActivityCreate, ActivityUpdate } from "../types/activity";

/**
 * Obtiene actividades.
 * Si se pasa `sort`, usa el endpoint /activities/sorted?sort=...
 */
export async function getActivities(sort?: string): Promise<Activity[]> {
  if (sort) {
    return apiClient(
      `activities/sorted?sort=${encodeURIComponent(sort)}`
    );
  }

  return apiClient("activities");
}

export async function getActivityById(id: number | string): Promise<Activity> {
  return apiClient(`activities/${id}`);
}

export async function createActivity(data: ActivityCreate): Promise<Activity> {
  return apiClient("activities", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function updateActivity(
  id: number | string,
  data: ActivityUpdate
): Promise<Activity> {
  return apiClient(`activities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export async function deleteActivity(id: number | string): Promise<void> {
  await apiClient(`activities/${id}`, {
    method: "DELETE"
  });
}