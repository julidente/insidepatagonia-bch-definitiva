import { optimizeCloudinaryImage } from "../utils/cloudinary";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts } from "../services/post.service";
import { Post } from "../types/post";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPublishedPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los artículos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Blog informativo</h1>
        <p>Cargando artículos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Blog informativo</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 1rem" }}>
      <section style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Blog informativo
        </h1>
        <p style={{ color: "#475569" }}>
          Artículos, novedades, consejos utiles e informacion interesante.
        </p>
      </section>

      {posts.length === 0 ? (
        <p>No hay artículos publicados todavía.</p>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {posts.map((post) => (
            <article
              key={post.post_id}
              style={{
                backgroundColor: "white",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                {post.cover_image_url ? (
                  <img
                    src={optimizeCloudinaryImage(post.cover_image_url, 800)}
                    alt={post.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      backgroundColor: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                      fontSize: "0.95rem"
                    }}
                  >
                    Sin imagen
                  </div>
                )}
              </Link>

              <div style={{ padding: "1rem" }}>
                <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "0.5rem" }}>
                  {new Date(post.createdAt).toLocaleDateString("es-AR")}
                </p>

                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{ textDecoration: "none", color: "#0f172a" }}
                  >
                    {post.title}
                  </Link>
                </h2>

                <p style={{ 
                    color: "#475569",
                    lineHeight: 1.5,
                    marginBottom: "1rem",
                    fontSize: "1rem",
                    fontWeight: 500 }}>
                  {post.description.length > 140
                    ? `${post.description.slice(0, 140)}...`
                    : post.description}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    fontWeight: 600,
                    color: "#0c4a6e"
                  }}
                >
                  Leer más
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}