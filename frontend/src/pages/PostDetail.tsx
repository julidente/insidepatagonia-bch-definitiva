import { optimizeCloudinaryImage } from "../utils/cloudinary";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPostBySlug } from "../services/post.service";
import { Post } from "../types/post";

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
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
        <p>Cargando artículo...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
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

  const optimizedImage = post.cover_image_url
    ? optimizeCloudinaryImage(post.cover_image_url)
    : "";

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      <Helmet>
        <title>{seoTitle}</title>

        <meta name="description" content={seoDescription} />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />

        {optimizedImage && (
          <meta property="og:image" content={optimizedImage} />
        )}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: seoDescription,
            image: optimizedImage || undefined,
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

      <article>
        <p style={{ color: "#64748b", marginBottom: "0.75rem" }}>
          {new Date(post.createdAt).toLocaleDateString("es-AR")}
        </p>

        <h1
          style={{
            fontSize: "2.2rem",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
            color: "#0f172a",
          }}
        >
          {post.title}
        </h1>

        {post.cover_image_url ? (
          <img
            src={optimizedImage}
            alt={`Imagen del artículo ${post.title}`}
            style={{
              width: "100%",
              maxHeight: "460px",
              objectFit: "cover",
              borderRadius: "16px",
              marginBottom: "1.5rem",
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
              color: "#64748b",
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
            whiteSpace: "pre-line",
          }}
        >
          {post.description}
        </div>
      </article>
    </main>
  );
}