import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const AppLayout = () => {
  const { isAuthenticated, logout, user } = useAuthContext();

  const footerLinkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const footerTextStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const footerIconStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    flexShrink: 0,
  };

  const footerCustomIconStyle: React.CSSProperties = {
    width: "22px",
    height: "22px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const collaboratorLogoStyle: React.CSSProperties = {
    height: "70px",
    maxWidth: "100px",
    objectFit: "contain",
    display: "block",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
      }}
    >
      <header style={{ backgroundColor: "#0c4a6e", color: "white" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <img
              src="/logos/logo inside.png"
              alt="Logo Inside Patagonia"
              style={{
                width: "42px",
                height: "42px",
                objectFit: "contain",
              }}
            />

            <span>INSIDE Patagonia</span>
          </Link>

          <nav
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "1rem",
              alignItems: "center",
            }}
          >
            <NavLink
              to="/#experiencias"
              end
              style={({ isActive }) => ({
                color: "white",
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400,
              })}
            >
              Proximas Actividades
            </NavLink>

            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: "white",
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400,
              })}
            >
              Sobre nosotros
            </NavLink>

            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                color: "white",
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400,
              })}
            >
              Contacto
            </NavLink>

            <NavLink
              to="/blog"
              style={({ isActive }) => ({
                color: "white",
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400,
              })}
            >
              Blog informativo
            </NavLink>

            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                color: "white",
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 600 : 400,
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
                  fontSize: "0.8rem",
                  color: "white",
                  textDecoration: "none",
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
                    cursor: "pointer",
                  }}
                >
                  Salir
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main style={{ flex: "1 0 auto" }}>
        <Outlet />
      </main>

      <footer
        style={{
          backgroundColor: "#050505",
          color: "white",
          marginTop: "auto",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "1.2rem 1rem",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1.6fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {/* Columna izquierda */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                marginBottom: "0.7rem",
              }}
            >
              <img
                src="/logos/logo inside.png"
                alt="Inside Patagonia"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                }}
              />

              <a
                href="https://www.instagram.com/retosur_turismoactivo/"
                target="_blank"
                rel="noreferrer"
                title="RetoSur Turismo Activo"
              >
                <img
                  src="/logos/logo retosur.png"
                  alt="RetoSur"
                  style={{
                    width: "120px",
                    maxHeight: "90px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </a>

              <a
                href="https://www.instagram.com/ilumina_photo_tours/"
                target="_blank"
                rel="noreferrer"
                title="Ilumina Photo Tours"
              >
                <img
                  src="/logos/LOGO ILUMINA NEW.png"
                  alt="Ilumina Photo Tours"
                  style={{
                    width: "120px",
                    maxHeight: "90px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </a>
            </div>

            <div
              style={{
                display: "grid",
                gap: "0.45rem",
                fontSize: "0.78rem",
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <span style={footerTextStyle}>
                <FaMapMarkerAlt
                  style={{ ...footerIconStyle, color: "#ef4444" }}
                />
                Av. General Arias 2470, Bahía Blanca
              </span>

              <span style={footerTextStyle}>
                <FaMapMarkerAlt
                  style={{ ...footerIconStyle, color: "#ef4444" }}
                />
                Le Esmeralda 555, Cipolletti
              </span>
            </div>
          </div>

          {/* Columna centro */}
          <div>
            <h3
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                marginBottom: "1rem",
                textAlign: "left",
                color: "white",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Contáctenos
            </h3>

            <div
              style={{
                display: "grid",
                gap: "0.55rem",
                fontSize: "0.78rem",
                lineHeight: 1.4,
              }}
            >
              <a
                href="https://wa.me/5492944509064"
                target="_blank"
                rel="noreferrer"
                style={footerLinkStyle}
              >
                <img
                  src="/icons/logos wapp.png"
                  alt="WhatsApp"
                  style={footerCustomIconStyle}
                />
                +54 9 2944 509064
              </a>

              <a
                href="mailto:inside.patagonia.bch@gmail.com"
                style={footerLinkStyle}
              >
                <img
                  src="/icons/logos internet.png"
                  alt="Email"
                  style={footerCustomIconStyle}
                />
                inside.patagonia.bch@gmail.com
              </a>

              <a
                href="https://www.instagram.com/inside.patagonia"
                target="_blank"
                rel="noreferrer"
                style={footerLinkStyle}
              >
                <img
                  src="/icons/logos instagram.png"
                  alt="Instagram"
                  style={footerCustomIconStyle}
                />
                inside.patagonia
              </a>

              <a
                href="https://www.tiktok.com/@inside.patagonia"
                target="_blank"
                rel="noreferrer"
                style={footerLinkStyle}
              >
                <img
                  src="/icons/logos tik.png"
                  alt="TikTok"
                  style={footerCustomIconStyle}
                />
                inside.patagonia
              </a>
            </div>
          </div>

          {/* Columna derecha: colaboradores */}
          <div>
            <h3
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                marginBottom: "1rem",
                textAlign: "center",
                color: "white",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              SOCIOS / AMIGOS
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "1.1rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://posadasanantonio.com.ar"
                target="_blank"
                rel="noreferrer"
                title="Posada San Antonio"
              >
                <img
                  src="/logos/san antonio.png"
                  alt="Posada San Antonio"
                  style={{
                    ...collaboratorLogoStyle,
                    height: "90px",
                  }}
                />
              </a>

              <a
                href="https://www.instagram.com/lagunastudioscalafate"
                target="_blank"
                rel="noreferrer"
                title="Laguna Studios"
              >
                <img
                  src="/logos/LAGUNA.png"
                  alt="Laguna Studios"
                  style={collaboratorLogoStyle}
                />
              </a>

              <a
                href="https://www.instagram.com/lospionerosmco"
                target="_blank"
                rel="noreferrer"
                title="Los Pioneros"
              >
                <img
                  src="/logos/PIONEROS.png"
                  alt="Los Pioneros"
                  style={collaboratorLogoStyle}
                />
              </a>

              <a
                href="https://campingpehoe.com"
                target="_blank"
                rel="noreferrer"
                title="Camping Pehoé"
              >
                <img
                  src="/logos/PEHOE.png"
                  alt="Camping Pehoé"
                  style={{
                    ...collaboratorLogoStyle,
                    maxWidth: "80px",
                  }}
                />
              </a>

              <a
                href="https://www.instagram.com/bunker.ronco"
                target="_blank"
                rel="noreferrer"
                title="Bunker Ronco Bariloche"
              >
                <img
                  src="/logos/logo bunker ronco.png"
                  alt="Bunker Ronco Bariloche"
                  style={{
                    ...collaboratorLogoStyle,
                    maxWidth: "80px",
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.65)",
            padding: "0.55rem 1rem",
          }}
        >
          © {new Date().getFullYear()} Inside Patagonia – Sitio turístico
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;