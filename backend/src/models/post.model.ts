export interface IPost {
  post_id: number;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
}
