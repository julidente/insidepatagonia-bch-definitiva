import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem"
      }}
    >
      <h1 style={{ fontSize: "2.25rem", fontWeight: 600 }}>404</h1>
      <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
        La página que buscas no existe.
      </p>
      <Link
        to="/"
        style={{
          marginTop: "0.5rem",
          backgroundColor: "#0369a1",
          color: "white",
          fontSize: "0.9rem",
          padding: "0.5rem 0.75rem",
          borderRadius: "0.375rem"
        }}
      >
        Volver al inicio
      </Link>
    </section>
  );
};

export default NotFound;
