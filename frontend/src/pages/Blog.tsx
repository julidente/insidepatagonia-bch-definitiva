import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { getPublishedPosts } from "../services/post.service";
import { Post } from "../types/post";
import { getImageUrl } from "../utils/imageUrl";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visiblePosts = !normalizedSearch
    ? posts
    : posts.filter((post) => {
        const title = post.title?.toLowerCase() ?? "";
        const description = post.description?.toLowerCase() ?? "";
        const metaTitle = post.meta_title?.toLowerCase() ?? "";
        const metaDescription = post.meta_description?.toLowerCase() ?? "";

        return (
          title.includes(normalizedSearch) ||
          description.includes(normalizedSearch) ||
          metaTitle.includes(normalizedSearch) ||
          metaDescription.includes(normalizedSearch)
        );
      });

  if (loading) {
    return (
      <main className="blog-page">
        <h1 className="blog-title">Blog informativo</h1>
        <p>Cargando artículos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="blog-page">
        <h1 className="blog-title">Blog informativo</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <>
      <SEO
        title="Blog informativo | Inside Patagonia"
        description="Artículos, novedades, consejos útiles e información interesante sobre turismo, excursiones, aventuras y destinos de la Patagonia."
        canonical="/blog"
      />

      <style>
        {`
          .blog-page {
            max-width: 1120px;
            margin: 0 auto;
            padding: 2rem 1rem 3rem;
          }

          .blog-header {
            margin-bottom: 2rem;
          }

          .blog-title {
            font-size: clamp(2rem, 5vw, 2.7rem);
            font-weight: 800;
            margin: 0 0 0.5rem;
            color: #0f172a;
            line-height: 1.15;
          }

          .blog-subtitle {
            color: #475569;
            font-size: 1rem;
            line-height: 1.6;
            margin: 0 0 1.25rem;
            max-width: 680px;
          }

          .blog-search-input {
            padding: 0.65rem 1rem;
            border-radius: 9999px;
            border: 1px solid #cbd5e1;
            font-size: 0.95rem;
            width: 100%;
            max-width: 380px;
            outline: none;
            background-color: #ffffff;
          }

          .blog-search-input:focus {
            border-color: #25608f;
            box-shadow: 0 0 0 3px rgba(37, 96, 143, 0.12);
          }

          .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .blog-card {
            background-color: white;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 14px rgba(0,0,0,0.08);
            display: flex;
            flex-direction: column;
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .blog-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 28px rgba(15, 23, 42, 0.14);
          }

          .blog-card-image,
          .blog-card-placeholder {
            width: 100%;
            height: 220px;
            display: block;
          }

          .blog-card-image {
            object-fit: cover;
          }

          .blog-card-placeholder {
            background-color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 0.95rem;
          }

          .blog-card-content {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }

          .blog-card-date {
            font-size: 0.9rem;
            color: #64748b;
            margin: 0 0 0.5rem;
          }

          .blog-card-title {
            font-size: 1.25rem;
            margin: 0 0 0.75rem;
            line-height: 1.3;
          }

          .blog-card-title a {
            text-decoration: none;
            color: #0f172a;
          }

          .blog-card-title a:hover {
            color: #25608f;
          }

          .blog-card-description {
            color: #475569;
            line-height: 1.5;
            margin: 0 0 1rem;
            font-size: 1rem;
            font-weight: 500;
            flex-grow: 1;
          }

          .blog-read-more {
            display: inline-block;
            text-decoration: none;
            font-weight: 700;
            color: #0c4a6e;
            margin-top: auto;
          }

          .blog-empty-message {
            color: #475569;
            font-size: 1rem;
            line-height: 1.6;
          }

          @media (max-width: 768px) {
            .blog-page {
              padding: 1.7rem 1rem 2.6rem;
            }

            .blog-header {
              text-align: center;
            }

            .blog-subtitle {
              margin-left: auto;
              margin-right: auto;
            }

            .blog-search-input {
              max-width: 100%;
            }

            .blog-grid {
              grid-template-columns: 1fr;
              gap: 1.25rem;
            }

            .blog-card-image,
            .blog-card-placeholder {
              height: 210px;
            }
          }

          @media (max-width: 480px) {
            .blog-page {
              padding: 1.4rem 0.85rem 2.3rem;
            }

            .blog-card {
              border-radius: 12px;
            }

            .blog-card-image,
            .blog-card-placeholder {
              height: 185px;
            }

            .blog-card-content {
              padding: 0.95rem;
            }

            .blog-card-title {
              font-size: 1.15rem;
            }

            .blog-card-description {
              font-size: 0.95rem;
            }
          }
        `}
      </style>

      <main className="blog-page">
        <section className="blog-header">
          <h1 className="blog-title">Blog informativo</h1>

          <p className="blog-subtitle">
            Artículos, novedades, consejos útiles e información interesante.
          </p>

          <input
            type="text"
            placeholder="Buscar posteos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="blog-search-input"
          />
        </section>

        {posts.length === 0 ? (
          <p className="blog-empty-message">
            No hay artículos publicados todavía.
          </p>
        ) : visiblePosts.length === 0 ? (
          <p className="blog-empty-message">
            No se encontraron artículos con esa búsqueda.
          </p>
        ) : (
          <section className="blog-grid">
            {visiblePosts.map((post) => (
              <article key={post.post_id} className="blog-card">
                <Link
                  to={`/blog/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {post.cover_image_url ? (
                    <img
                      src={getImageUrl(post.cover_image_url)}
                      alt={post.title}
                      loading="lazy"
                      className="blog-card-image"
                    />
                  ) : (
                    <div className="blog-card-placeholder">Sin imagen</div>
                  )}
                </Link>

                <div className="blog-card-content">
                  <p className="blog-card-date">
                    {new Date(post.createdAt).toLocaleDateString("es-AR")}
                  </p>

                  <h2 className="blog-card-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="blog-card-description">
                    {post.description.length > 140
                      ? `${post.description.slice(0, 140)}...`
                      : post.description}
                  </p>

                  <Link to={`/blog/${post.slug}`} className="blog-read-more">
                    Leer más
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}