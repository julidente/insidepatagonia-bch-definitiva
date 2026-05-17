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
    <>
      <style>
        {`
          .admin-posts-page {
            max-width: 1120px;
            margin: 0 auto;
            padding: 2.3rem 1rem 3rem;
          }

          .admin-posts-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.7rem;
          }

          .admin-posts-title {
            font-size: clamp(1.8rem, 5vw, 2.4rem);
            font-weight: 800;
            margin: 0 0 0.5rem;
            color: #0f172a;
            line-height: 1.15;
          }

          .admin-posts-description {
            color: #475569;
            margin: 0;
            line-height: 1.6;
            font-size: 0.98rem;
          }

          .admin-posts-new-button {
            background-color: #0c4a6e;
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.1rem;
            border-radius: 9999px;
            font-weight: 800;
            font-size: 0.95rem;
            box-shadow: 0 10px 20px rgba(12, 74, 110, 0.22);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .admin-posts-new-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 26px rgba(12, 74, 110, 0.3);
          }

          .admin-posts-message {
            color: #475569;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 1rem;
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
          }

          .admin-posts-error {
            color: #991b1b;
            background-color: #fee2e2;
            border: 1px solid #fecaca;
            border-radius: 14px;
            padding: 1rem;
          }

          .admin-posts-list {
            display: grid;
            gap: 1rem;
          }

          .admin-post-card {
            background-color: white;
            border-radius: 16px;
            padding: 1rem;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
            display: grid;
            grid-template-columns: 160px minmax(0, 1fr) auto;
            gap: 1rem;
            align-items: center;
          }

          .admin-post-card-image,
          .admin-post-card-placeholder {
            width: 160px;
            height: 100px;
            border-radius: 10px;
          }

          .admin-post-card-image {
            object-fit: cover;
            display: block;
          }

          .admin-post-card-placeholder {
            background-color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 0.85rem;
          }

          .admin-post-card-content {
            min-width: 0;
          }

          .admin-post-card-title {
            font-size: 1.2rem;
            margin: 0 0 0.4rem;
            color: #0f172a;
            line-height: 1.3;
          }

          .admin-post-card-meta {
            color: #64748b;
            margin: 0 0 0.35rem;
            font-size: 0.92rem;
            line-height: 1.45;
            word-break: break-word;
          }

          .admin-post-card-description {
            color: #475569;
            margin: 0;
            line-height: 1.55;
            font-size: 0.95rem;
          }

          .admin-post-status {
            display: inline-flex;
            align-items: center;
            width: fit-content;
            padding: 0.22rem 0.6rem;
            border-radius: 9999px;
            font-size: 0.78rem;
            font-weight: 800;
            margin-left: 0.25rem;
          }

          .admin-post-status--published {
            background-color: #dcfce7;
            color: #166534;
          }

          .admin-post-status--draft {
            background-color: #fef3c7;
            color: #92400e;
          }

          .admin-post-card-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .admin-post-action {
            text-decoration: none;
            border: none;
            padding: 0.6rem 0.95rem;
            border-radius: 9999px;
            text-align: center;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
            min-width: 96px;
          }

          .admin-post-action:hover {
            transform: translateY(-2px);
          }

          .admin-post-action--edit {
            background-color: #e2e8f0;
            color: #0f172a;
          }

          .admin-post-action--delete {
            background-color: #dc2626;
            color: white;
          }

          @media (max-width: 820px) {
            .admin-posts-page {
              padding: 1.8rem 1rem 2.6rem;
            }

            .admin-posts-header {
              flex-direction: column;
              align-items: stretch;
              text-align: center;
            }

            .admin-posts-new-button {
              width: 100%;
            }

            .admin-post-card {
              grid-template-columns: 1fr;
              gap: 0.9rem;
            }

            .admin-post-card-image,
            .admin-post-card-placeholder {
              width: 100%;
              height: 220px;
            }

            .admin-post-card-actions {
              flex-direction: row;
            }

            .admin-post-action {
              flex: 1;
            }
          }

          @media (max-width: 480px) {
            .admin-posts-page {
              padding: 1.4rem 0.85rem 2.3rem;
            }

            .admin-post-card {
              border-radius: 14px;
              padding: 0.9rem;
            }

            .admin-post-card-image,
            .admin-post-card-placeholder {
              height: 185px;
            }

            .admin-post-card-title {
              font-size: 1.08rem;
            }

            .admin-post-card-description {
              font-size: 0.92rem;
            }

            .admin-post-card-actions {
              flex-direction: column;
            }

            .admin-post-action {
              width: 100%;
            }
          }
        `}
      </style>

      <main className="admin-posts-page">
        <div className="admin-posts-header">
          <div>
            <h1 className="admin-posts-title">Administrar artículos</h1>

            <p className="admin-posts-description">
              Creá, editá y eliminá publicaciones del blog informativo.
            </p>
          </div>

          <Link to="/admin/posts/new" className="admin-posts-new-button">
            Nuevo artículo
          </Link>
        </div>

        {loading ? (
          <p className="admin-posts-message">Cargando artículos...</p>
        ) : error ? (
          <p className="admin-posts-error">{error}</p>
        ) : posts.length === 0 ? (
          <p className="admin-posts-message">
            No hay artículos cargados todavía.
          </p>
        ) : (
          <div className="admin-posts-list">
            {posts.map((post) => (
              <article key={post.post_id} className="admin-post-card">
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="admin-post-card-image"
                  />
                ) : (
                  <div className="admin-post-card-placeholder">
                    Sin imagen
                  </div>
                )}

                <div className="admin-post-card-content">
                  <h2 className="admin-post-card-title">{post.title}</h2>

                  <p className="admin-post-card-meta">Slug: {post.slug}</p>

                  <p className="admin-post-card-meta">
                    Estado:
                    <span
                      className={`admin-post-status ${
                        post.is_published
                          ? "admin-post-status--published"
                          : "admin-post-status--draft"
                      }`}
                    >
                      {post.is_published ? "Publicado" : "Borrador"}
                    </span>
                  </p>

                  <p className="admin-post-card-description">
                    {post.description.length > 120
                      ? `${post.description.slice(0, 120)}...`
                      : post.description}
                  </p>
                </div>

                <div className="admin-post-card-actions">
                  <Link
                    to={`/admin/posts/${post.post_id}/edit`}
                    className="admin-post-action admin-post-action--edit"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(post)}
                    className="admin-post-action admin-post-action--delete"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}