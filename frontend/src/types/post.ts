export interface Post {
  post_id: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  is_published: boolean;
  slug: string;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCreate {
  title: string;
  description: string;
  is_published?: boolean;
}

export interface PostUpdate {
  title?: string;
  description?: string;
  is_published?: boolean;
}