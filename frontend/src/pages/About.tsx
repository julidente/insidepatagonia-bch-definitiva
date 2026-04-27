const About = () => {
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
        padding: "4rem 1.5rem"
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
            Sobre nosotros
          </p>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem"
            }}
          >
            Conocé Inside Patagonia
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.9,
              marginBottom: "1.2rem"
            }}
          >
            Somos Inside Patagonia, una empresa dedicada a ofrecer experiencias unicas
            . Creemos que cada viaje debe convertirse en una
            experiencia inolvidable. Nos dedicamos a realizar excursiones,
            aventuras y recorridos seleccionados para que descubras paisajes
            únicos, glaciares, montañas, lagos y toda la magia de la Patagonia.
          </p>

          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.9,
              marginBottom: "1.2rem"
            }}
          >
            Nuestro objetivo es ayudarte a encontrar actividades confiables,
            claras y bien organizadas, para que puedas elegir con tranquilidad
            la propuesta que mejor se adapte a tu gusto y presupuesto.
          </p>

          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.9,
              margin: 0
            }}
          >
            Queremos que vivas la Patagonia de una manera auténtica, simple y
            memorable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;