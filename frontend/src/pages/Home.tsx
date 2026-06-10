import { optimizeCloudinaryImage } from '../utils/cloudinary';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from "../components/SEO";
import { getActivities } from '../services/activity.service';
import type { Activity } from '../types/activity';

const API_URL = import.meta.env.VITE_API_URL;
const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

type SortValue =
  | ''
  | 'priceAsc'
  | 'priceDesc'
  | 'nameAsc'
  | 'nameDesc'
  | 'startDateAsc'
  | 'startDateDesc';

const Home = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const location = useLocation();

  const loadActivities = async (selectedSort: SortValue) => {
    try {
      setLoading(true);
      setError(null);

      let sortParam: string | undefined;

      if (selectedSort === 'nameAsc' || selectedSort === 'nameDesc') {
        sortParam = 'name';
      } else if (selectedSort === '') {
        sortParam = undefined;
      } else {
        sortParam = selectedSort;
      }

      const data = await getActivities(sortParam);
      let parsed: Activity[] = Array.isArray(data) ? data.map((a) => a) : [];

      if (selectedSort === 'nameDesc') {
        parsed = [...parsed].reverse();
      }

      setActivities(parsed);
    } catch (err: any) {
      console.error(err);
      setError('No se pudieron cargar las actividades.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities('');
  }, []);

  useEffect(() => {
    if (location.hash !== '#experiencias') return;

    const timeoutId = window.setTimeout(() => {
      const section = document.getElementById('experiencias');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [location]);

  const handleSortChange = (value: SortValue) => {
    setSort(value);
    loadActivities(value);
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visibleActivities = !normalizedSearch
    ? activities
    : activities.filter((a) => {
        const name = a.name?.toLowerCase() ?? '';
        const location = a.location?.toLowerCase() ?? '';
        const activityType = a.activity_type?.toLowerCase() ?? '';
        const summary = a.summary?.toLowerCase() ?? '';

        return (
          name.includes(normalizedSearch) ||
          location.includes(normalizedSearch) ||
          activityType.includes(normalizedSearch) ||
          summary.includes(normalizedSearch)
        );
      });

  return (
    <div>
      <SEO
        title="Inside Patagonia - sitio oficial"
        description="Descubre las mejores aventuras, actividades y experiencias en la Patagonia con Inside Patagonia. Excursiones seleccionadas, salidas inolvidables."
        canonical="/"
      />

      <style>
        {`
          .identity-title-section {
            width: 100%;
            min-height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 3rem 1.5rem;
            box-sizing: border-box;
            background:
              linear-gradient(
                135deg,
                rgba(7, 55, 79, 0.96),
                rgba(12, 74, 110, 0.9),
                rgba(55, 65, 81, 0.82)
              ),
              url('/portada.png');
            background-size: cover;
            background-position: center;
            color: white;
          }

          .identity-title-content {
            max-width: 1200px;
            margin: 0 auto;
          }

          .identity-title-content h1 {
            margin: 0;
            color: white;
            font-size: clamp(1.8rem, 3.5vw, 3.6rem);
            line-height: 1.05;
            font-weight: 300;
            letter-spacing: 0.04em;
            text-wrap: balance;
          }

          .identity-section {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background-color: #000;
            align-items: stretch;
          }

          .identity-section img {
            width: 100%;
            height: auto;
            object-fit: cover;
            display: block;
          }

          .home-hero-adventure {
            background-image:
              linear-gradient(to bottom, rgba(15,23,42,0.7), rgba(15,23,42,0.85)),
              url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 3.5rem 1rem 3rem;
            text-align: center;
          }

          .home-hero-adventure h1 {
            font-size: clamp(1.75rem, 5vw, 2.1rem);
          }

          .sales-points-section {
  width: 100%;
  background: #e2e8f0;
  padding: 2.4rem 1rem 2.8rem;
  text-align: center;
}

.sales-points-section h2 {
  margin: 0 0 1.8rem;
  font-size: clamp(1.7rem, 4vw, 2.3rem);
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #111827;
}

.sales-points-logos {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 4rem;
  flex-wrap: wrap;
}

.sales-point-card {
  width: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #1f2937;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.sales-point-card:hover {
  transform: translateY(-5px);
  opacity: 0.85;
}

.sales-point-card img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 0.7rem;
}

.sales-point-card span {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Tablet */
@media (max-width: 768px) {
  .sales-points-section {
    padding: 2rem 1rem 2.4rem;
  }

  .sales-points-section h2 {
    margin-bottom: 1.5rem;
  }

  .sales-points-logos {
    gap: 2.5rem;
  }

  .sales-point-card {
    width: 145px;
  }

  .sales-point-card img {
    width: 115px;
    height: 115px;
  }

  .sales-point-card span {
    font-size: 0.78rem;
  }
}

/* Celular chico */
@media (max-width: 480px) {
  .sales-points-section {
    padding: 1.8rem 1rem 2.2rem;
  }

  .sales-points-section h2 {
    font-size: 1.45rem;
    margin-bottom: 1.4rem;
  }

  .sales-points-logos {
    gap: 1.8rem;
  }

  .sales-point-card {
    width: 130px;
  }

  .sales-point-card img {
    width: 100px;
    height: 100px;
  }

  .sales-point-card span {
    font-size: 0.72rem;
  }
}

          .home-experiences-section {
            max-width: 1120px;
            margin: 0 auto;
            padding: 2rem 1rem 3rem;
          }

          .home-experiences-header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .home-filters {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.9rem;
          }

          .home-search-input {
            padding: 0.5rem 0.8rem;
            border-radius: 9999px;
            border: 1px solid #cbd5f5;
            font-size: 0.85rem;
            min-width: 220px;
          }

          .home-sort-box {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .home-sort-select {
            padding: 0.5rem 0.8rem;
            border-radius: 9999px;
            border: 1px solid #cbd5f5;
            font-size: 0.85rem;
            background-color: white;
            cursor: pointer;
          }

          .activities-grid {
            display: grid;
            gap: 1.75rem;
            grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          }

          .activity-card {
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 18px 25px -12px rgba(15, 23, 42, 0.18);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            border: 1px solid #e2e8f0;
          }

          .activity-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 24px 40px -16px rgba(15, 23, 42, 0.28);
          }

          .activity-card-cover {
            position: relative;
            height: 240px;
            overflow: hidden;
            background: linear-gradient(to bottom, #1d4ed8, #0ea5e9);
          }

          .activity-card-image {
            transition: transform 0.35s ease;
          }

          .activity-card:hover .activity-card-image {
            transform: scale(1.05);
          }

          @media (max-width: 900px) {
            .identity-section {
              grid-template-columns: 1fr;
            }

            .identity-section img {
              height: auto;
              object-fit: contain;
            }
          }

          @media (max-width: 768px) {
            .identity-title-section {
              min-height: 140px;
              padding: 2.2rem 1rem;
            }

            .identity-title-content h1 {
              font-size: 2rem;
              line-height: 1.15;
            }

            .home-hero-adventure {
              padding: 2.6rem 1rem 2.4rem;
            }

            .home-experiences-section {
              padding: 1.7rem 1rem 2.6rem;
            }

            .home-experiences-header {
              flex-direction: column;
              align-items: stretch;
            }

            .home-experiences-header h2,
            .home-experiences-header p {
              text-align: center;
            }

            .home-filters {
              width: 100%;
              flex-direction: column;
              align-items: stretch;
            }

            .home-search-input {
              width: 100%;
              min-width: 0;
            }

            .home-sort-box {
              width: 100%;
              flex-direction: column;
              align-items: stretch;
              text-align: center;
            }

            .home-sort-select {
              width: 100%;
            }

            .activities-grid {
              grid-template-columns: 1fr;
              gap: 1.4rem;
            }

            .activity-card-cover {
              height: 210px;
            }

            .activity-card h3 {
              font-size: 1.3rem !important;
            }
          }

          @media (max-width: 480px) {
            .identity-title-content h1 {
              font-size: 1.55rem;
            }

            .home-hero-adventure {
              padding: 2.2rem 1rem;
            }

            .home-hero-adventure p {
              font-size: 0.9rem !important;
            }

            .activity-card-cover {
              height: 190px;
            }

            .activity-card {
              border-radius: 0.85rem;
            }
          }
        `}
      </style>

      <section className="identity-title-section">
        <div className="identity-title-content">
          <h1>TRES PROPUESTAS, UNA MISMA IDENTIDAD</h1>
        </div>
      </section>

      <section className="identity-section">
        <img src="/home/3.PNG" alt="Aventura - Inside Patagonia" />
        <img src="/home/2.PNG" alt="Movimiento - RetoSur" />
        <img src="/home/1.PNG" alt="Mirada - Ilumina" />
      </section>

      <section className="home-hero-adventure">
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              opacity: 0.9,
            }}
          >
            inside patagonia
          </p>

          <h1
            style={{
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            INGRESA A LA AVENTURA
          </h1>

          <p
            style={{
              fontSize: '0.95rem',
              maxWidth: '640px',
              margin: '0 auto',
              opacity: 0.92,
            }}
          >
            Excursiones seleccionadas, salidas inolvidables.
            Encontrá tu próxima aventura entre montañas, glaciares y lagos
            patagónicos.
          </p>
        </div>
      </section>

      <section className="sales-points-section">
        <h2>PUNTOS DE VENTA</h2>

        <div className="sales-points-logos">
          <a
            href="https://wa.me/5491169650927"
            target="_blank"
            rel="noopener noreferrer"
            className="sales-point-card"
            aria-label="Contactar por WhatsApp a Hotel Maneco"
          >
            <img src="/logos/logo-maneco.png" alt="Hotel Maneco" />
            <span>CAVIAHUE</span>
          </a>

          <a
            href="https://wa.me/5492995237867"
            target="_blank"
            rel="noopener noreferrer"
            className="sales-point-card"
            aria-label="Contactar por WhatsApp a Estudio Pisani"
          >
            <img src="/logos/logo-estudio-pisani.png" alt="Estudio Pisani" />
            <span>CIPOLLETTI</span>
          </a>

          <a
            href="https://wa.me/5492995763595"
            target="_blank"
            rel="noopener noreferrer"
            className="sales-point-card"
            aria-label="Contactar por WhatsApp a Bar Hopfen"
          >
            <img src="/logos/hopfen.png" alt="Neuquén" />
            <span>NEUQUÉN</span>
          </a>
        </div>
      </section>

      <section id="experiencias" className="home-experiences-section">
        <div className="home-experiences-header">
          <div>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 600,
                marginBottom: '0.25rem',
              }}
            >
              Todas las actividades
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Elegí entre las excursiones más populares de la región.
            </p>
          </div>

          <div className="home-filters">
            <input
              type="text"
              placeholder="Buscar por nombre, ubicación o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="home-search-input"
            />

            <div className="home-sort-box">
              <span style={{ color: '#475569' }}>Ordenar por:</span>

              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value as SortValue)}
                className="home-sort-select"
              >
                <option value="">Sin orden</option>
                <option value="priceAsc">Precio (menor a mayor)</option>
                <option value="priceDesc">Precio (mayor a menor)</option>
                <option value="nameAsc">Nombre (A-Z)</option>
                <option value="nameDesc">Nombre (Z-A)</option>
                <option value="startDateAsc">Fecha de inicio (ascendente)</option>
                <option value="startDateDesc">Fecha de inicio (descendente)</option>
              </select>
            </div>
          </div>
        </div>

        {loading && <p>Cargando actividades...</p>}
        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        {!loading && !error && (
          <div className="activities-grid">
            {visibleActivities.map((a) => {
              const coverImage = a.images?.find((img) => img.is_cover) ?? null;
              const rawCover = coverImage?.url ?? null;

              const cover =
                rawCover && !rawCover.startsWith('http')
                  ? `${API_ORIGIN}${rawCover}`
                  : rawCover
                    ? optimizeCloudinaryImage(rawCover, 600)
                    : rawCover;

              const hasPrice =
                a.price !== null &&
                a.price !== undefined &&
                a.price !== '' &&
                Number.isFinite(Number(a.price));

              return (
                <Link
                  key={a.activity_id}
                  to={`/destinos/${a.activity_id}`}
                  className="activity-card"
                >
                  <div className="activity-card-cover">
                    <div
                      className="activity-card-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: cover
                          ? `url(${cover})`
                          : 'linear-gradient(to bottom, #1d4ed8, #0ea5e9)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    {a.activity_type && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '0.85rem',
                          top: '0.85rem',
                          backgroundColor: 'rgba(15,23,42,0.88)',
                          color: 'white',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.35rem 0.7rem',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {a.activity_type}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      padding: '1.2rem 1.1rem 1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.7rem',
                      flexGrow: 1,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.55rem',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        color: '#0f172a',
                        margin: 0,
                      }}
                    >
                      {a.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#64748b',
                        margin: 0,
                      }}
                    >
                      {a.location}
                    </p>

                    {a.summary && (
                      <p
                        style={{
                          fontSize: '0.95rem',
                          color: '#334155',
                          fontWeight: 500,
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {a.summary}
                      </p>
                    )}

                    <div
                      style={{
                        marginTop: '0.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.15rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#94a3b8',
                          fontWeight: 700,
                        }}
                      >
                        {hasPrice ? 'Desde' : 'Precio'}
                      </span>

                      <span
                        style={{
                          fontSize: '1.7rem',
                          fontWeight: 800,
                          color: '#25608f',
                          lineHeight: 1.1,
                        }}
                      >
                        {hasPrice
                          ? `${a.price_currency ?? 'ARS'} ${Number(
                              a.price
                            ).toLocaleString('es-AR')}`
                          : 'Próximamente'}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.92rem',
                        color: '#0369a1',
                        marginTop: '0.35rem',
                        fontWeight: 700,
                      }}
                    >
                      Ver detalles ›
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;