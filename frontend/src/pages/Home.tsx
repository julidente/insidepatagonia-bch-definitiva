import { optimizeCloudinaryImage } from '../utils/cloudinary';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from "../components/SEO";
import { getActivities } from '../services/activity.service';
import type { Activity } from '../types/activity';

const API_URL = import.meta.env.VITE_API_URL;
const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

type SortValue = '' | 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc'| 'startDateAsc' | 'startDateDesc';

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
          .identity-section {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background-color: #000;
            align-items: start;
          }

          .identity-section img {
            width: 100%;
            height: auto;
            object-fit: contain;
            display: block;
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
        `}
      </style>

      <section className="identity-section">
        <img
          src="/home/3.PNG"
          alt="Aventura - Inside Patagonia"
        />

        <img
          src="/home/2.PNG"
          alt="Movimiento - RetoSur"
        />

        <img
          src="/home/1.PNG"
          alt="Mirada - Ilumina"
        />
      </section>

      <section
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(15,23,42,0.7), rgba(15,23,42,0.85)), url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '3.5rem 1rem 3rem',
          textAlign: 'center',
        }}
      >
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
              fontSize: '2.1rem',
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

      <section
        id="experiencias"
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '2rem 1rem 3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
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

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.9rem',
            }}
          >
            <input
              type="text"
              placeholder="Buscar por nombre, ubicación o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.35rem 0.6rem',
                borderRadius: '9999px',
                border: '1px solid #cbd5f5',
                fontSize: '0.85rem',
                minWidth: '220px',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ color: '#475569' }}>Ordenar por:</span>
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value as SortValue)}
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5f5',
                  fontSize: '0.85rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
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
          <div
            style={{
              display: 'grid',
              gap: '1.75rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            }}
          >
            {visibleActivities.map((a) => {
              const coverImage =
                a.images?.find((img) => img.is_cover) ?? a.images?.[0] ?? null;

              const rawCover = coverImage?.url ?? null;

              const cover =
                rawCover && !rawCover.startsWith('http')
                  ? `${API_ORIGIN}${rawCover}`
                  : rawCover
                    ? optimizeCloudinaryImage(rawCover, 800)
                    : rawCover;

              return (
                <Link
                  key={a.activity_id}
                  to={`/destinos/${a.activity_id}`}
                  className="activity-card"
                >
                  <div
                    style={{
                      position: 'relative',
                      height: '240px',
                      overflow: 'hidden',
                      background:
                        'linear-gradient(to bottom, #1d4ed8, #0ea5e9)',
                    }}
                  >
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

                    {a.price && (
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
                          Desde
                        </span>
                        <span
                          style={{
                            fontSize: '1.7rem',
                            fontWeight: 800,
                            color: '#25608f',
                            lineHeight: 1.1,
                          }}
                        >
                          {a.price_currency}{' '}
                          {Number(a.price).toLocaleString('es-AR')}
                        </span>
                      </div>
                    )}

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