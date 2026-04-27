const Contact = () => {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 96px)",
        backgroundImage:
          "linear-gradient(rgba(12, 74, 110, 0.55), rgba(12, 74, 110, 0.55)), url('/portada.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        padding: "4rem 1.5 rem",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          width: "100%",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            color: "white",
            textShadow: "0 2px 14px rgba(0, 0, 0, 0.45)"
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#dbeafe"
            }}
          >
            Contacto
          </p>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem"
            }}
          >
            Estamos para ayudarte
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.9,
              marginBottom: "2rem"
            }}
          >
            Si tenés dudas sobre nuestras experiencias, excursiones o querés
            recibir más información, podés comunicarte con nosotros por WhatsApp o seguirnos en nuestras redes sociales.
          </p>

          <div
            style={{
              display: "grid",
              gap: "1rem",
              maxWidth: "400px"
            }}
          >
            <div
              style={{
                padding: "1rem 1.2rem",
                borderRadius: "0.9rem",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)"
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                  color: "white"
                }}
              >
                WhatsApp
              </h2>
              <p style={{ margin: 0, fontSize: "1.05rem", color: "#f8fafc" }}>
                +54 9 294 450 9064
              </p>
            </div>

            <div
              style={{
                padding: "1rem 1.2rem",
                borderRadius: "0.9rem",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)"
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                  color: "white"
                }}
              >
                Instagram
              </h2>
              <p style={{ margin: 0, fontSize: "1.05rem", color: "#f8fafc" }}>
                @inside.patagonia
              </p>
            </div>

            <div
              style={{
                padding: "1rem 1.2rem",
                borderRadius: "0.9rem",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)"
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                  color: "white"
                }}
              >
                TikTok
              </h2>
              <p style={{ margin: 0, fontSize: "1.05rem", color: "#f8fafc" }}>
                @insidepatagonia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;