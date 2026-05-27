import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { FaBars, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

const AppLayout = () => {
  const { isAuthenticated, logout, user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const footerLinkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
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
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" onClick={closeMenu} className="site-header__logo">
            <img
              src="/logos/logo inside.png"
              alt="Logo Inside Patagonia"
              className="site-header__logo-img"
            />

            <span>INSIDE Patagonia</span>
          </Link>

          <button
            type="button"
            className="site-header__menu-button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav
            className={`site-header__nav ${
              isMenuOpen ? "site-header__nav--open" : ""
            }`}
          >
            <NavLink
              to="/#experiencias"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "site-header__nav-link site-header__nav-link--active"
                  : "site-header__nav-link"
              }
            >
              Próximas Actividades
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "site-header__nav-link site-header__nav-link--active"
                  : "site-header__nav-link"
              }
            >
              Sobre nosotros
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "site-header__nav-link site-header__nav-link--active"
                  : "site-header__nav-link"
              }
            >
              Contacto
            </NavLink>

            <NavLink
              to="/blog"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "site-header__nav-link site-header__nav-link--active"
                  : "site-header__nav-link"
              }
            >
              Blog informativo
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/admin"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "site-header__nav-link site-header__nav-link--active"
                      : "site-header__nav-link"
                  }
                >
                  Panel admin
                </NavLink>

                <div className="site-header__admin-box">
                  <span className="site-header__user">
                    {user?.email ?? "Admin"}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="site-header__logout"
                  >
                    Salir
                  </button>
                </div>
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
        <div className="site-footer__content">
          {/* Columna izquierda */}
          <div>
            <div className="site-footer__brand-logos">
              <img
                src="/logos/logo inside.png"
                alt="Inside Patagonia"
                className="site-footer__main-logo"
                style={{
                  width: "105px",
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
                  className="site-footer__partner-main-logo"
                  style={{
                    width: "100px",
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
                  className="site-footer__partner-main-logo"
                  style={{
                    width: "100px",
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
                lineHeight: 2,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <a
                href="https://maps.app.goo.gl/Mz65xWCQgmyGndrh8"
                target="_blank"
                rel="noreferrer"
                style={footerLinkStyle}
              >
                <FaMapMarkerAlt
                  style={{ ...footerIconStyle, color: "#ef4444" }}
                />
                Av. General Arias 2470, Bahía Blanca
              </a>

              <a
                href="https://maps.app.goo.gl/anLWaqNk9AMBW33q9"
                target="_blank"
                rel="noreferrer"
                style={footerLinkStyle}
              >
                <FaMapMarkerAlt
                  style={{ ...footerIconStyle, color: "#ef4444" }}
                />
                La Esmeralda 555, Cipolletti
              </a>
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

          {/* Columna derecha */}
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
                flexDirection: "column",
                gap: "0.9rem",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1.5rem",
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
                  href="https://www.instagram.com/treeksur/"
                  target="_blank"
                  rel="noreferrer"
                  title="TreekSur"
                >
                  <img
                    src="/logos/logos treeksur.png"
                    alt="TreekSur"
                    style={collaboratorLogoStyle}
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
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
              </div>
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