import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityById } from '../services/activity.service';
import type { Activity } from '../types/activity';

const API_URL = import.meta.env.VITE_API_URL;
const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

const sectionTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#25608f',
  marginBottom: '1rem',
};

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #dbe5ee',
  borderRadius: '1rem',
  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)',
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

type FormattedTextOptions = {
  fontSize?: string;
  lineHeight?: number;
  color?: string;
  paragraphMarginBottom?: string;
  listMarginBottom?: string;
};

const renderFormattedText = (
  text?: string | null,
  options: FormattedTextOptions = {}
) => {
  if (!text) return null;

  const {
    fontSize = '1rem',
    lineHeight = 1.8,
    color = '#36516a',
    paragraphMarginBottom = '1rem',
    listMarginBottom = '1rem',
  } = options;

  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul
          key={`list-${key++}`}
          style={{
            margin: `0 0 ${listMarginBottom} 1.25rem`,
            paddingLeft: '1.25rem',
            lineHeight,
            color,
            fontSize,
          }}
        >
          {currentList.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.35rem' }}>
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      elements.push(<div key={`space-${key++}`} style={{ height: '0.9rem' }} />);
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2).trim());
    } else {
      flushList();
      elements.push(
        <p
          key={`p-${key++}`}
          style={{
            margin: `0 0 ${paragraphMarginBottom} 0`,
            lineHeight,
            color,
            fontSize,
            whiteSpace: 'pre-wrap',
          }}
        >
          {trimmed}
        </p>
      );
    }
  }

  flushList();

  return elements;
};

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await getActivityById(id);
        setActivity(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la actividad.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <p style={{ padding: '2rem 1rem' }}>Cargando actividad...</p>;
  }

  if (error || !activity) {
    return (
      <p style={{ padding: '2rem 1rem', color: 'crimson' }}>
        {error || 'Actividad no encontrada'}
      </p>
    );
  }

  const coverImage =
    activity.images?.find((img) => img.is_cover) ?? activity.images?.[0] ?? null;

  const galleryImages = activity.images?.filter((img) => !img.is_cover) ?? [];

  const getImageSrc = (url?: string | null) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_ORIGIN}${url}`;
  };

  const formattedPrice = Number(activity.price).toLocaleString('es-AR');

  const allTopImages = [coverImage, ...galleryImages].filter(Boolean).slice(0, 3);
  const mainTopImage = allTopImages[0];
  const secondaryTopImages = allTopImages.slice(1, 3);

  const firstAvailableDate = activity.availableDates?.[0];
  const startDate = firstAvailableDate?.start_date ?? null;
  const endDate = firstAvailableDate?.end_date ?? null;
  const isSingleDay = startDate && endDate && startDate === endDate;

  const whatsappUrl = `https://wa.me/5492944509064?text=${encodeURIComponent(
    `Hola, quiero reservar la actividad: ${activity.name}`
  )}`;

  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2.5rem 1rem 4rem',
        color: '#16324a',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: 700,
          color: '#2d6f9c',
          marginBottom: '1.5rem',
          lineHeight: 1.1,
        }}
      >
        {activity.name}
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 360px)',
          gap: '1.5rem',
          alignItems: 'start',
          marginBottom: '3rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: secondaryTopImages.length > 0 ? '1.5fr 1fr' : '1fr',
              gap: '0.75rem',
              minHeight: '420px',
            }}
          >
            <div
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                background: '#dbeafe',
                minHeight: '420px',
                ...cardStyle,
              }}
            >
              {mainTopImage && getImageSrc(mainTopImage.url) ? (
                <img
                  src={getImageSrc(mainTopImage.url)!}
                  alt={activity.name}
                  onClick={() => setSelectedImage(getImageSrc(mainTopImage.url)!)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    cursor: 'zoom-in',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '420px',
                    background: 'linear-gradient(135deg, #60a5fa, #0ea5e9)',
                  }}
                />
              )}
            </div>

            {secondaryTopImages.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: secondaryTopImages.length === 1 ? '1fr' : '1fr 1fr',
                  gap: '0.75rem',
                }}
              >
                {secondaryTopImages.map((img) => {
                  const src = getImageSrc(img?.url);
                  if (!src) return null;

                  return (
                    <div
                      key={img!.image_id}
                      style={{
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        background: '#e2e8f0',
                        minHeight: '200px',
                        ...cardStyle,
                      }}
                    >
                      <img
                        src={src}
                        alt={activity.name}
                        onClick={() => setSelectedImage(src)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          cursor: 'zoom-in',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {galleryImages.length > 2 && (
            <div style={{ marginTop: '1rem' }}>
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#25608f',
                  marginBottom: '0.85rem',
                }}
              >
                Más imágenes
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.9rem',
                }}
              >
                {galleryImages.slice(2).map((img) => {
                  const src = getImageSrc(img.url);
                  if (!src) return null;

                  return (
                    <div
                      key={img.image_id}
                      style={{
                        borderRadius: '0.9rem',
                        overflow: 'hidden',
                        minHeight: '170px',
                        ...cardStyle,
                      }}
                    >
                      <img
                        src={src}
                        alt={activity.name}
                        onClick={() => setSelectedImage(src)}
                        style={{
                          width: '100%',
                          height: '170px',
                          objectFit: 'cover',
                          display: 'block',
                          cursor: 'zoom-in',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <aside
          style={{
            ...cardStyle,
            padding: '1.5rem',
            position: 'sticky',
            top: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#7c8ea3',
              marginBottom: '0.35rem',
              fontWeight: 700,
            }}
          >
            Desde
          </p>

          <p
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#25608f',
              marginBottom: '1rem',
              lineHeight: 1,
            }}
          >
            {activity.price_currency} {formattedPrice}
          </p>

          <div
            style={{
              display: 'grid',
              gap: '0.7rem',
              fontSize: '1rem',
              color: '#38536b',
              marginBottom: '1.25rem',
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>Ubicación:</strong> {activity.location}
            </p>

            {startDate && endDate && isSingleDay && (
              <p style={{ margin: 0 }}>
                <strong>Fecha:</strong> {formatDate(startDate)}
              </p>
            )}

            {startDate && endDate && !isSingleDay && (
              <>
                <p style={{ margin: 0 }}>
                  <strong>Inicio:</strong> {formatDate(startDate)}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Fin:</strong> {formatDate(endDate)}
                </p>
              </>
            )}

            {activity.activity_type && (
              <p style={{ margin: 0 }}>
                <strong>Tipo:</strong> {activity.activity_type}
              </p>
            )}

            {activity.duration_hours && (
              <p style={{ margin: 0 }}>
                <strong>Duración:</strong> {activity.duration_hours} horas
              </p>
            )}

            {activity.distance && (
              <p style={{ margin: 0 }}>
                <strong>Distancia:</strong> {activity.distance}
              </p>
            )}

            {activity.activity_days && (
              <p style={{ margin: 0 }}>
                <strong>Días de actividad:</strong> {activity.activity_days}
              </p>
            )}

            {activity.technical_difficulty && (
              <p style={{ margin: 0 }}>
                <strong>Dificultad técnica:</strong> {activity.technical_difficulty}
              </p>
            )}

            {activity.effort_level && (
              <p style={{ margin: 0 }}>
                <strong>Nivel de esfuerzo:</strong> {activity.effort_level}
              </p>
            )}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              width: '100%',
              marginTop: '1.25rem',
              padding: '0.95rem 1rem',
              backgroundColor: '#25D366',
              color: '#ffffff',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 10px 20px rgba(37, 211, 102, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 24px rgba(37, 211, 102, 0.32)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 211, 102, 0.25)';
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '22px',
                height: '22px',
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 32 32"
                width="22"
                height="22"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.11 17.37c-.3-.15-1.77-.87-2.05-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.45 1.07 2.85 1.22 3.05.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.62.71.22 1.35.19 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                <path d="M16.02 3.2c-7.06 0-12.78 5.72-12.78 12.78 0 2.25.58 4.45 1.68 6.38L3.16 28.8l6.59-1.73a12.73 12.73 0 0 0 6.27 1.61h.01c7.05 0 12.77-5.72 12.77-12.78 0-3.42-1.33-6.63-3.75-9.05A12.7 12.7 0 0 0 16.02 3.2Zm0 23.37h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.91 1.03 1.05-3.81-.25-.4a10.63 10.63 0 1 1 8.91 4.89Z" />
              </svg>
            </span>

            Reservar por WhatsApp
          </a>
        </aside>
      </div>

      {activity.what_you_will_do && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={sectionTitleStyle}>¿Qué vas a hacer?</h2>
          <div
            style={{
              ...cardStyle,
              padding: '1.5rem 1.75rem',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#1f3c56',
            }}
          >
            {renderFormattedText(activity.what_you_will_do, {
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#1f3c56',
            })}
          </div>
        </section>
      )}

      {(activity.summary || activity.description) && (
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              ...cardStyle,
              padding: '1.75rem',
            }}
          >
            {activity.summary && (
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#2d6f9c',
                  marginTop: 0,
                  marginBottom: '1.25rem',
                  lineHeight: 1.3,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {activity.summary}
              </h2>
            )}

            {activity.description && (
              <div
                style={{
                  lineHeight: 1.9,
                  color: '#060f17',
                  fontSize: '1.05rem',
                }}
              >
                {renderFormattedText(activity.description, {
                  fontSize: '1.05rem',
                  lineHeight: 1.9,
                  color: '#060f17',
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {activity.important_info && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={sectionTitleStyle}>Información importante</h2>
          <div
            style={{
              ...cardStyle,
              padding: '1.5rem 1.75rem',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#060f17',
            }}
          >
            {renderFormattedText(activity.important_info, {
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#060f17',
            })}
          </div>
        </section>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {activity.includes && (
          <section style={{ ...cardStyle, padding: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#25608f',
                marginTop: 0,
                marginBottom: '1rem',
              }}
            >
              Incluye
            </h2>
            <div
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: '#36516a',
                fontSize: '1rem',
              }}
            >
              {renderFormattedText(activity.includes, {
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#36516a',
              })}
            </div>
          </section>
        )}

        {activity.not_includes && (
          <section style={{ ...cardStyle, padding: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#25608f',
                marginTop: 0,
                marginBottom: '1rem',
              }}
            >
              No incluye
            </h2>
            <div
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: '#36516a',
                fontSize: '1rem',
              }}
            >
              {renderFormattedText(activity.not_includes, {
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#36516a',
              })}
            </div>
          </section>
        )}

        {activity.has_additional_cost && activity.additional_cost && (
          <section style={{ ...cardStyle, padding: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#25608f',
                marginTop: 0,
                marginBottom: '1rem',
              }}
            >
              Costos adicionales
            </h2>
            <div
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: '#36516a',
                fontSize: '1rem',
              }}
            >
              {renderFormattedText(activity.additional_cost, {
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#36516a',
              })}
            </div>
          </section>
        )}

        {activity.accommodation_detail && (
          <section style={{ ...cardStyle, padding: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#25608f',
                marginTop: 0,
                marginBottom: '1rem',
              }}
            >
              Alojamiento
            </h2>
            <div
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: '#36516a',
                fontSize: '1rem',
              }}
            >
              {renderFormattedText(activity.accommodation_detail, {
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#36516a',
              })}
            </div>
          </section>
        )}

        {activity.transfer_detail && (
          <section style={{ ...cardStyle, padding: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#25608f',
                marginTop: 0,
                marginBottom: '1rem',
              }}
            >
              Traslado
            </h2>
            <div
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: '#36516a',
                fontSize: '1rem',
              }}
            >
              {renderFormattedText(activity.transfer_detail, {
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#36516a',
              })}
            </div>
          </section>
        )}

        {activity.tips && (
          <section style={{ ...cardStyle, padding: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#25608f',
                marginTop: 0,
                marginBottom: '1rem',
              }}
            >
              Tips para la actividad
            </h2>
            <div
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: '#36516a',
                fontSize: '1rem',
              }}
            >
              {renderFormattedText(activity.tips, {
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#36516a',
              })}
            </div>
          </section>
        )}
      </div>

      {(activity.meeting_point_1 || activity.meeting_point_2) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={sectionTitleStyle}>Puntos de encuentro</h2>

          <div
            style={{
              ...cardStyle,
              padding: '1.5rem 1.75rem',
            }}
          >
            <ul
              style={{
                margin: 0,
                paddingLeft: '1.25rem',
                lineHeight: 2,
                color: '#36516a',
                fontSize: '1rem',
              }}
            >
              {activity.meeting_point_1 && <li>{activity.meeting_point_1}</li>}
              {activity.has_multiple_meeting_points && activity.meeting_point_2 && (
                <li>{activity.meeting_point_2}</li>
              )}
            </ul>
          </div>
        </section>
      )}

      <section>
        <h2 style={sectionTitleStyle}>Información técnica</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            activity.activity_type
              ? { label: 'Tipo de actividad', value: activity.activity_type }
              : null,
            activity.duration_hours
              ? { label: 'Duración', value: `${activity.duration_hours} horas` }
              : null,
            activity.distance
              ? { label: 'Distancia', value: activity.distance }
              : null,
            activity.activity_days
              ? { label: 'Días de actividad', value: `${activity.activity_days}` }
              : null,
            activity.technical_difficulty
              ? { label: 'Dificultad técnica', value: activity.technical_difficulty }
              : null,
            activity.effort_level
              ? { label: 'Nivel de esfuerzo', value: activity.effort_level }
              : null,
          ]
            .filter(Boolean)
            .map((item, index) => (
              <div
                key={index}
                style={{
                  ...cardStyle,
                  padding: '1.2rem',
                }}
              >
                <p
                  style={{
                    margin: '0 0 0.35rem 0',
                    fontSize: '0.9rem',
                    color: '#6b8094',
                    fontWeight: 600,
                  }}
                >
                  {item!.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '1.05rem',
                    color: '#1f3c56',
                    fontWeight: 700,
                  }}
                >
                  {item!.value}
                </p>
              </div>
            ))}
        </div>
      </section>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.82)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            zIndex: 9999,
            cursor: 'zoom-out',
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              width: '48px',
              height: '48px',
              borderRadius: '9999px',
              cursor: 'pointer',
            }}
            aria-label="Cerrar imagen"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Vista ampliada"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95vw',
              maxHeight: '90vh',
              borderRadius: '1rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              objectFit: 'contain',
              cursor: 'default',
            }}
          />
        </div>
      )}
    </section>
  );
};

export default ActivityDetail;