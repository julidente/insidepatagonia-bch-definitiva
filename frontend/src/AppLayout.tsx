import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const AppLayout = () => {
  const { isAuthenticated, logout, user } = useAuthContext();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header style={{ backgroundColor: "#0c4a6e", color: "white" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem"
          }}
        >
          <Link to="/" style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            Inside Patagonia
          </Link>

          <nav style={{ display: "flex", gap: "1rem", fontSize: "0.9rem", alignItems: "center" }}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400
              })}
            >
              Experiencias
            </NavLink>

            <NavLink
              to="/about"
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400
              })}
            >
              Sobre nosotros
            </NavLink>

            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400
              })}
            >
              Contacto
            </NavLink>

            <NavLink
              to="/blog"
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400
              })}
            >
              Blog informativo
            </NavLink>

            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400
              })}
            >
              Panel admin
            </NavLink>

            {!isAuthenticated ? (
              <Link
                to="/login"
                style={{
                  marginLeft: "0.5rem",
                  padding: "0.35rem 0.9rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.6)",
                  fontSize: "0.8rem"
                }}
              >
                Ingresar
              </Link>
            ) : (
              <>
                <span style={{ fontSize: "0.8rem", opacity: 0.85 }}>
                  {user?.email ?? "Admin"}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  style={{
                    marginLeft: "0.5rem",
                    padding: "0.35rem 0.9rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.6)",
                    background: "transparent",
                    color: "white",
                    fontSize: "0.8rem",
                    cursor: "pointer"
                  }}
                >
                  Salir
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer
        style={{
          backgroundColor: "#0c4a6e",
          color: "white",
          textAlign: "center",
          fontSize: "0.75rem",
          padding: "0.75rem",
          marginTop: "0"
        }}
      >
        © {new Date().getFullYear()} Inside Patagonia – Sitio turístico
      </footer>
    </div>
  );
};

export default AppLayout;