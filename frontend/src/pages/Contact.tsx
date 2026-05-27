import SEO from "../components/SEO";
import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <SEO
        title="Contacto | Inside Patagonia"
        description="Comunicate con Inside Patagonia por WhatsApp, email o redes sociales."
        canonical="/contact"
      />

      <style>
        {`
          .contact-page {
            min-height: calc(100vh - 96px);
            background-image:
              linear-gradient(rgba(12, 74, 110, 0.62), rgba(12, 74, 110, 0.68)),
              url('/portada.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            padding: 4rem 1.5rem;
          }

          .contact-container {
            max-width: 1120px;
            width: 100%;
            margin: 0 auto;
          }

          .contact-content {
            max-width: 900px;
            color: white;
            text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
          }

          .contact-kicker {
            font-size: 0.9rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            font-weight: 700;
            margin: 0 0 1rem;
            color: #dbeafe;
          }

          .contact-title {
            font-size: clamp(2.1rem, 6vw, 3.4rem);
            font-weight: 800;
            line-height: 1.1;
            margin: 0 0 1.5rem;
            color: white;
          }

          .contact-description {
            font-size: 1.15rem;
            line-height: 1.9;
            margin: 0 0 2rem;
            max-width: 760px;
          }

          .contact-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
            max-width: 820px;
          }

          .contact-card {
            padding: 1rem 1.2rem;
            border-radius: 0.9rem;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.28);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
            color: white;
            text-decoration: none;
            display: flex;
            align-items: flex-start;
            gap: 0.85rem;
            transition: transform 0.2s ease, background 0.2s ease;
          }

          .contact-card:hover {
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.2);
          }

          .contact-icon {
            width: 22px;
            height: 22px;
            flex-shrink: 0;
            margin-top: 0.1rem;
            color: #dbeafe;
          }

          .contact-card h2 {
            font-size: 1.12rem;
            font-weight: 800;
            margin: 0 0 0.35rem;
            color: white;
          }

          .contact-card p {
            margin: 0;
            font-size: 1rem;
            line-height: 1.5;
            color: #f8fafc;
            font-weight: 600;
            word-break: break-word;
          }

          .contact-card span {
            display: block;
            margin-top: 0.25rem;
            font-size: 0.85rem;
            color: rgba(248, 250, 252, 0.85);
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .contact-page {
              min-height: auto;
              padding: 3rem 1rem;
              align-items: flex-start;
            }

            .contact-content {
              text-align: center;
            }

            .contact-description {
              font-size: 1rem;
              line-height: 1.75;
              margin-left: auto;
              margin-right: auto;
            }

            .contact-grid {
              grid-template-columns: 1fr;
              max-width: 520px;
              margin: 0 auto;
            }

            .contact-card {
              text-align: left;
            }
          }

          @media (max-width: 480px) {
            .contact-page {
              padding: 2.4rem 0.85rem;
            }

            .contact-kicker {
              font-size: 0.78rem;
            }

            .contact-description {
              font-size: 0.96rem;
            }

            .contact-card {
              padding: 0.95rem;
              border-radius: 0.8rem;
            }

            .contact-card h2 {
              font-size: 1rem;
            }

            .contact-card p {
              font-size: 0.92rem;
            }
          }
        `}
      </style>

      <section className="contact-page">
        <div className="contact-container">
          <div className="contact-content">
            <p className="contact-kicker">Contacto</p>

            <h1 className="contact-title">Estamos para ayudarte</h1>

            <p className="contact-description">
              Si tenés dudas sobre nuestras experiencias, excursiones o querés
              recibir más información, podés comunicarte con nosotros por
              WhatsApp, email o redes sociales.
            </p>

            <div className="contact-grid">
              <a
                href="https://wa.me/5492944509064"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <FaWhatsapp className="contact-icon" />
                <div>
                  <h2>WhatsApp</h2>
                  <p>+54 9 294 450 9064</p>
                  <span>Consultas y reservas</span>
                </div>
              </a>

              <a
                href="mailto:inside.patagonia.bch@gmail.com"
                className="contact-card"
              >
                <FaEnvelope className="contact-icon" />
                <div>
                  <h2>Email</h2>
                  <p>inside.patagonia.bch@gmail.com</p>
                  <span>Contacto institucional</span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/inside.patagonia"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <FaInstagram className="contact-icon" />
                <div>
                  <h2>Instagram</h2>
                  <p>@inside.patagonia</p>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@inside.patagonia"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <FaTiktok className="contact-icon" />
                <div>
                  <h2>TikTok</h2>
                  <p>@inside.patagonia</p>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/Mz65xWCQgmyGndrh8"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h2>Bahía Blanca</h2>
                  <p>Av. General Arias 2470</p>
                  <span>Ver ubicación en Google Maps</span>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/anLWaqNk9AMBW33q9"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h2>Cipolletti</h2>
                  <p>La Esmeralda 555</p>
                  <span>Ver ubicación en Google Maps</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;