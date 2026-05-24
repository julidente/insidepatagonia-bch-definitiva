import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPostBySlug } from "../services/post.service";
import { Post } from "../types/post";
import { getImageUrl } from "../utils/imageUrl";

const SITE_URL = "https://insidepatagonia-bch.com.ar";

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
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el artículo.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="post-detail-page">
        <p>Cargando artículo...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="post-detail-page">
        <Helmet>
          <title>Artículo no encontrado | Inside Patagonia</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <p>{error || "Artículo no encontrado."}</p>
      </main>
    );
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const seoTitle = post.meta_title || `${post.title} | Inside Patagonia`;
  const seoDescription =
    post.meta_description || post.description.slice(0, 155);

  const imageUrl = getImageUrl(post.cover_image_url);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>

        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />

        {imageUrl && <meta property="og:image" content={imageUrl} />}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: seoDescription,
            image: imageUrl || undefined,
            author: {
              "@type": "Organization",
              name: "Inside Patagonia",
            },
            publisher: {
              "@type": "Organization",
              name: "Inside Patagonia",
            },
            datePublished: post.createdAt,
            dateModified: post.updatedAt || post.createdAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          })}
        </script>
      </Helmet>

      <style>
        {`
          .post-detail-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 2.3rem 1rem 3.5rem;
          }

          .post-detail-article {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            padding: 1.6rem;
            box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
          }

          .post-detail-date {
            color: #64748b;
            margin: 0 0 0.75rem;
            font-size: 0.95rem;
          }

          .post-detail-title {
            font-size: clamp(2rem, 5vw, 2.7rem);
            line-height: 1.15;
            margin: 0 0 1.4rem;
            color: #0f172a;
            font-weight: 800;
            text-wrap: balance;
          }

          .post-detail-cover {
            width: 100%;
            max-height: 460px;
            object-fit: cover;
            border-radius: 16px;
            margin-bottom: 1.5rem;
            display: block;
          }

          .post-detail-placeholder {
            width: 100%;
            height: 320px;
            border-radius: 16px;
            margin-bottom: 1.5rem;
            background-color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
          }

          .post-detail-content {
            font-size: 1.05rem;
            line-height: 1.9;
            color: #0f172a;
            font-weight: 500;
            white-space: pre-line;
          }

          @media (max-width: 768px) {
            .post-detail-page {
              padding: 1.7rem 1rem 2.8rem;
            }

            .post-detail-article {
              padding: 1.25rem;
              border-radius: 16px;
            }

            .post-detail-title {
              text-align: center;
            }

            .post-detail-date {
              text-align: center;
            }

            .post-detail-cover {
              max-height: 360px;
              border-radius: 14px;
            }

            .post-detail-placeholder {
              height: 260px;
              border-radius: 14px;
            }

            .post-detail-content {
              font-size: 1rem;
              line-height: 1.8;
            }
          }

          @media (max-width: 480px) {
            .post-detail-page {
              padding: 1.3rem 0.85rem 2.4rem;
            }

            .post-detail-article {
              padding: 1rem;
              border-radius: 14px;
            }

            .post-detail-cover {
              max-height: 260px;
              border-radius: 12px;
              margin-bottom: 1.25rem;
            }

            .post-detail-placeholder {
              height: 220px;
              border-radius: 12px;
              margin-bottom: 1.25rem;
            }

            .post-detail-content {
              font-size: 0.97rem;
              line-height: 1.75;
            }
          }
        `}
      </style>

      <main className="post-detail-page">
        <article className="post-detail-article">
          <p className="post-detail-date">
            {new Date(post.createdAt).toLocaleDateString("es-AR")}
          </p>

          <h1 className="post-detail-title">{post.title}</h1>

          {post.cover_image_url ? (
            <img
              src={imageUrl}
              alt={`Imagen del artículo ${post.title}`}
              className="post-detail-cover"
              loading="lazy"
            />
          ) : (
            <div className="post-detail-placeholder">Sin imagen</div>
          )}

          <div className="post-detail-content">{post.description}</div>
        </article>
      </main>
    </>
  );
}