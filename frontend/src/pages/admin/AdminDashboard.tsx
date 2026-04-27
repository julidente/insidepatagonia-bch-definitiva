import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <section
      style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "2rem 1rem"
      }}
    >
      <h1 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.75rem" }}>
        Panel del administrador
      </h1>

      <p style={{ fontSize: "0.9rem", color: "#475569", marginBottom: "1.5rem" }}>
        Desde acá vas a poder administrar destinos, imágenes y toda la información del sitio turístico.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem"
        }}
      >
        <Link
          to="/admin/activities"
          style={{
            backgroundColor: "white",
            borderRadius: "14px",
            padding: "1.25rem",
            textDecoration: "none",
            color: "#0f172a",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Administrar experiencias
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.5 }}>
            Creá, editá y eliminá experiencias turísticas del sitio.
          </p>
        </Link>

        <Link
          to="/admin/posts"
          style={{
            backgroundColor: "white",
            borderRadius: "14px",
            padding: "1.25rem",
            textDecoration: "none",
            color: "#0f172a",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Administrar blog informativo
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.5 }}>
            Creá, editá y eliminá artículos para el blog del sitio.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboard;