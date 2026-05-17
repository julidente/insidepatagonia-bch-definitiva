import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <style>
        {`
          .admin-dashboard-page {
            max-width: 1120px;
            margin: 0 auto;
            padding: 2.4rem 1rem 3rem;
          }

          .admin-dashboard-header {
            margin-bottom: 1.8rem;
          }

          .admin-dashboard-title {
            font-size: clamp(1.8rem, 5vw, 2.4rem);
            font-weight: 800;
            margin: 0 0 0.75rem;
            color: #0f172a;
            line-height: 1.15;
          }

          .admin-dashboard-description {
            font-size: 1rem;
            color: #475569;
            margin: 0;
            line-height: 1.6;
            max-width: 720px;
          }

          .admin-dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
          }

          .admin-dashboard-card {
            background-color: white;
            border-radius: 16px;
            padding: 1.4rem;
            text-decoration: none;
            color: #0f172a;
            box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display: flex;
            flex-direction: column;
            min-height: 170px;
          }

          .admin-dashboard-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 30px rgba(15, 23, 42, 0.14);
          }

          .admin-dashboard-card-label {
            display: inline-flex;
            align-items: center;
            width: fit-content;
            margin-bottom: 0.9rem;
            padding: 0.3rem 0.75rem;
            border-radius: 9999px;
            background-color: #e0f2fe;
            color: #0369a1;
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          .admin-dashboard-card-title {
            font-size: 1.25rem;
            font-weight: 800;
            margin: 0 0 0.65rem;
            color: #0f172a;
            line-height: 1.3;
          }

          .admin-dashboard-card-text {
            color: #475569;
            line-height: 1.6;
            margin: 0;
            font-size: 0.98rem;
          }

          .admin-dashboard-card-action {
            margin-top: auto;
            padding-top: 1rem;
            color: #0369a1;
            font-weight: 800;
            font-size: 0.95rem;
          }

          @media (max-width: 768px) {
            .admin-dashboard-page {
              padding: 1.8rem 1rem 2.6rem;
            }

            .admin-dashboard-header {
              text-align: center;
            }

            .admin-dashboard-description {
              margin: 0 auto;
            }

            .admin-dashboard-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }

            .admin-dashboard-card {
              min-height: auto;
              padding: 1.25rem;
            }
          }

          @media (max-width: 480px) {
            .admin-dashboard-page {
              padding: 1.4rem 0.85rem 2.3rem;
            }

            .admin-dashboard-card {
              border-radius: 14px;
              padding: 1.1rem;
            }

            .admin-dashboard-card-title {
              font-size: 1.15rem;
            }

            .admin-dashboard-card-text {
              font-size: 0.95rem;
            }
          }
        `}
      </style>

      <section className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Panel del administrador</h1>

          <p className="admin-dashboard-description">
            Desde acá vas a poder administrar destinos, imágenes y toda la
            información del sitio turístico.
          </p>
        </div>

        <div className="admin-dashboard-grid">
          <Link to="/admin/activities" className="admin-dashboard-card">
            <span className="admin-dashboard-card-label">Experiencias</span>

            <h2 className="admin-dashboard-card-title">
              Administrar experiencias
            </h2>

            <p className="admin-dashboard-card-text">
              Creá, editá y eliminá experiencias turísticas del sitio.
            </p>

            <span className="admin-dashboard-card-action">
              Ir a experiencias ›
            </span>
          </Link>

          <Link to="/admin/posts" className="admin-dashboard-card">
            <span className="admin-dashboard-card-label">Blog</span>

            <h2 className="admin-dashboard-card-title">
              Administrar blog informativo
            </h2>

            <p className="admin-dashboard-card-text">
              Creá, editá y eliminá artículos para el blog del sitio.
            </p>

            <span className="admin-dashboard-card-action">Ir al blog ›</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;