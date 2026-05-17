import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Página no encontrada | Inside Patagonia"
        description="La página que estás buscando no existe o fue movida."
        canonical="/404"
      />

      <style>
        {`
          .not-found-page {
            min-height: calc(100vh - 96px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
            background:
              linear-gradient(
                rgba(12, 74, 110, 0.68),
                rgba(15, 23, 42, 0.78)
              ),
              url('/portada.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: white;
            text-align: center;
          }

          .not-found-card {
            width: 100%;
            max-width: 520px;
            padding: 2.2rem 1.5rem;
            border-radius: 1.2rem;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.28);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
          }

          .not-found-code {
            font-size: clamp(3.5rem, 12vw, 6rem);
            font-weight: 900;
            line-height: 1;
            margin: 0 0 0.8rem;
            color: white;
          }

          .not-found-title {
            font-size: clamp(1.5rem, 5vw, 2.1rem);
            font-weight: 800;
            margin: 0 0 0.75rem;
            color: white;
          }

          .not-found-text {
            color: #e2e8f0;
            font-size: 1rem;
            line-height: 1.6;
            margin: 0 auto 1.5rem;
            max-width: 380px;
          }

          .not-found-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #0369a1;
            color: white;
            font-size: 0.95rem;
            font-weight: 800;
            padding: 0.75rem 1.25rem;
            border-radius: 9999px;
            text-decoration: none;
            box-shadow: 0 10px 20px rgba(3, 105, 161, 0.28);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .not-found-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 26px rgba(3, 105, 161, 0.36);
          }

          @media (max-width: 600px) {
            .not-found-page {
              min-height: calc(100vh - 80px);
              padding: 2.2rem 0.85rem;
              align-items: flex-start;
            }

            .not-found-card {
              padding: 1.8rem 1.1rem;
              border-radius: 1rem;
            }

            .not-found-text {
              font-size: 0.95rem;
            }

            .not-found-link {
              width: 100%;
              padding: 0.8rem 1rem;
            }
          }
        `}
      </style>

      <section className="not-found-page">
        <div className="not-found-card">
          <h1 className="not-found-code">404</h1>

          <h2 className="not-found-title">Página no encontrada</h2>

          <p className="not-found-text">
            La página que buscás no existe, fue movida o ya no está disponible.
          </p>

          <Link to="/" className="not-found-link">
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
