export interface CreatePostDTO {
  title: string;
  description: string;
  is_published?: boolean;
  cover_image_url?: string | null;
  cover_image_public_id?: string | null;
}

export interface UpdatePostDTO {
  title?: string;
  description?: string;
  is_published?: boolean;
  cover_image_url?: string | null;
  cover_image_public_id?: string | null;
}
