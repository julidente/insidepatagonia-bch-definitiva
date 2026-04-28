import { optimizeCloudinaryImage } from "../utils/cloudinary";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../services/post.service";
import { Post } from "../types/post";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Artículo no encontrado.");
        setLoading(false);
        return;
      }

      try {
        const data = await getPostBySlug(slug);
        setPost(data);

        document.title = data.meta_title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", data.meta_description);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el artículo.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => {
      document.title = "Inside Patagonia";
    };
  }, [slug]);

  if (loading) {
    return (
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
        <p>Cargando artículo...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
        <p>{error || "Artículo no encontrado."}</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      <article>
        <p style={{ color: "#64748b", marginBottom: "0.75rem" }}>
          {new Date(post.createdAt).toLocaleDateString("es-AR")}
        </p>

        <h1
          style={{
            fontSize: "2.2rem",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
            color: "#0f172a"
          }}
        >
          {post.title}
        </h1>

        {post.cover_image_url ? (
          <img
            src={optimizeCloudinaryImage(post.cover_image_url)}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: "460px",
              objectFit: "cover",
              borderRadius: "16px",
              marginBottom: "1.5rem"
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "320px",
              borderRadius: "16px",
              marginBottom: "1.5rem",
              backgroundColor: "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b"
            }}
          >
            Sin imagen
          </div>
        )}

        <div
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.9,
            color: "#0f172a",
            fontWeight: 500,
            whiteSpace: "pre-line"
          }}
        >
          {post.description}
        </div>
      </article>
    </main>
  );
}