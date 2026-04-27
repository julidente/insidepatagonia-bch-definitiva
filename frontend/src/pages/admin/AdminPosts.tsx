import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getAllPosts } from "../../services/post.service";
import type { Post } from "../../types/post";

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los artículos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post: Post) => {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar el artículo "${post.title}"?`
    );

    if (!confirmed) return;

    try {
      await deletePost(post.post_id);
      await fetchPosts();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el artículo.");
    }
  };

  return (
    <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem"
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Administrar artículos
          </h1>
          <p style={{ color: "#475569" }}>
            Creá, editá y eliminá publicaciones del blog informativo.
          </p>
        </div>

        <Link
          to="/admin/posts/new"
          style={{
            backgroundColor: "#0c4a6e",
            color: "white",
            textDecoration: "none",
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            fontWeight: 600
          }}
        >
          Nuevo artículo
        </Link>
      </div>

      {loading ? (
        <p>Cargando artículos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length === 0 ? (
        <p>No hay artículos cargados todavía.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {posts.map((post) => (
            <article
              key={post.post_id}
              style={{
                backgroundColor: "white",
                borderRadius: "14px",
                padding: "1rem",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                display: "grid",
                gridTemplateColumns: "160px 1fr auto",
                gap: "1rem",
                alignItems: "center"
              }}
            >
              {post.cover_image_url ? (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  style={{
                    width: "160px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "160px",
                    height: "100px",
                    borderRadius: "10px",
                    backgroundColor: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    fontSize: "0.85rem"
                  }}
                >
                  Sin imagen
                </div>
              )}

              <div>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "0.35rem" }}>
                  {post.title}
                </h2>

                <p style={{ color: "#64748b", marginBottom: "0.35rem" }}>
                  Slug: {post.slug}
                </p>

                <p style={{ color: "#64748b", marginBottom: "0.35rem" }}>
                  Estado: {post.is_published ? "Publicado" : "Borrador"}
                </p>

                <p style={{ color: "#475569" }}>
                  {post.description.length > 120
                    ? `${post.description.slice(0, 120)}...`
                    : post.description}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link
                  to={`/admin/posts/${post.post_id}/edit`}
                  style={{
                    textDecoration: "none",
                    backgroundColor: "#e2e8f0",
                    color: "#0f172a",
                    padding: "0.55rem 0.9rem",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: 600
                  }}
                >
                  Editar
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "0.55rem 0.9rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}