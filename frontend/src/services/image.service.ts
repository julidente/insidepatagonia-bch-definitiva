import { getStoredToken } from './authStorage';

const API_URL = import.meta.env.VITE_API_URL;

export async function uploadActivityImage(
  activityId: number | string,
  file: File,
  isCover: boolean
) {
  const token = getStoredToken();

  const formData = new FormData();
  formData.append('image', file);
  formData.append('activity_id', String(activityId));
  formData.append('is_cover', String(isCover));

  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/images`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Error al subir la imagen');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
}

export async function deleteActivityImage(imageId: number | string) {
  const token = getStoredToken();

  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/images/${imageId}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Error al eliminar la imagen');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
}