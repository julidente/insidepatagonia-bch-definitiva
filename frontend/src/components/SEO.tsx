import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

const SITE_URL = "https://insidepatagonia-bch.com.ar";

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = "website",
  noIndex = false,
}: SEOProps) {
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={fullCanonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={type} />

      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}