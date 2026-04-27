import { apiClient } from "./apiClient";
import { Post, PostCreate, PostUpdate } from "../types/post";

export async function getPublishedPosts(): Promise<Post[]> {
  return apiClient("posts/published");
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return apiClient(`posts/slug/${slug}`);
}

export async function getAllPosts(): Promise<Post[]> {
  return apiClient("posts");
}

export async function getPostById(id: number | string): Promise<Post> {
  return apiClient(`posts/${id}`);
}

export async function createPost(data: PostCreate): Promise<Post> {
  return apiClient("posts", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function updatePost(
  id: number | string,
  data: PostUpdate
): Promise<Post> {
  return apiClient(`posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export async function uploadPostImage(
  id: number | string,
  file: File
): Promise<Post> {
  const formData = new FormData();
  formData.append("image", file);

  return apiClient(`posts/${id}/image`, {
    method: "POST",
    body: formData
  });
}

export async function deletePost(id: number | string): Promise<void> {
  await apiClient(`posts/${id}`, {
    method: "DELETE"
  });
}