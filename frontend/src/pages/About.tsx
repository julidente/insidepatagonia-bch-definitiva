import SEO from "../components/SEO";

const About = () => {
  return (
    <>
      <SEO
        title="Sobre nosotros | Inside Patagonia"
        description="Conocé Inside Patagonia, una empresa dedicada a ofrecer experiencias únicas en la Patagonia. Descubrí excursiones, aventuras y recorridos seleccionados para vivir la magia de esta región."
        canonical="/about"
      />

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
          padding: "4rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              maxWidth: "760px",
              color: "white",
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.45)",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "#dbeafe",
              }}
            >
              Sobre nosotros
            </p>

            <h1
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Conocé Inside Patagonia
            </h1>

            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.9,
                marginBottom: "1.2rem",
              }}
            >
              Somos Maria Jose y Alberto, organizadores de experiencias y aventuras en la Patagonia. Trabajamos junto a guías argentinos y chilenos, y a una red de colaboradores que comparten nuestra pasión por la montaña, los viajes y la vida al aire libre.
              La Patagonia es nuestro lugar en el mundo. Recorremos y operamos en destinos como Bariloche, El Chaltén, Puerto Natales, Pucón, Melipeuco y Caviahue, creando experiencias auténticas para quienes buscan descubrir cada rincón del sur de Argentina y Chile.
              Creemos en las aventuras compartidas, en el contacto real con la naturaleza y en las experiencias que dejan recuerdos para toda la vida.
              
            </p>

            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.9,
                marginBottom: "1.2rem",
              }}
            >
              Además, desarrollamos proyectos que acompañan nuestra visión: Reto Sur, un grupo de entrenamiento gratuito para clientes en Cipolletti; Ilumina Photo Tours, enfocado en viajes y aventuras fotográficas en la Patagonia; y TreekSur, nuestro servicio exclusivo de transporte, pensado para brindar comodidad, seguridad y conexión entre los distintos destinos.
            </p>

            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.9,
                marginBottom: "1.2rem",
              }}
            >
              Nuestro objetivo es ayudarte a encontrar actividades confiables,
              claras y bien organizadas, para que puedas elegir con tranquilidad
              la propuesta que mejor se adapte a tu gusto y presupuesto.
            </p>

            <p
              style={{
                fontSize: "1.5rem",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              Queremos que vivas la Patagonia de una manera auténtica, simple y
              memorable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;