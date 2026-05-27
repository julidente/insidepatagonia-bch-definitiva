import { optimizeCloudinaryImage } from '../utils/cloudinary';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityById } from '../services/activity.service';
import type { Activity } from '../types/activity';
import { FaWhatsapp } from 'react-icons/fa';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

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

  const coverImage = activity.images?.find((img) => img.is_cover) ?? null;
  const galleryImages = activity.images?.filter((img) => !img.is_cover) ?? [];

  const getImageSrc = (url?: string | null, width = 2000) => {
    if (!url) return null;

    if (url.startsWith('http')) {
      return optimizeCloudinaryImage(url, width);
    }

    return `${API_ORIGIN}${url}`;
  };

  const hasPrice =
    activity.price !== null &&
    activity.price !== undefined &&
    activity.price !== '' &&
    Number.isFinite(Number(activity.price));

  const formattedPrice = hasPrice
    ? Number(activity.price).toLocaleString('es-AR')
    : 'Próximamente';

  const coverImageSrc = getImageSrc(coverImage?.url);
  const galleryImageSources = galleryImages
    .map((img) => getImageSrc(img.url))
    .filter((src): src is string => Boolean(src));

  const allImageSources = [coverImageSrc, ...galleryImageSources].filter(
    (src): src is string => Boolean(src)
  );

  const mainTopImage = coverImageSrc;
  const secondaryTopImages = galleryImageSources.slice(0, 2);

  const goToPreviousImage = () => {
    setSelectedImageIndex((prev) => {
      if (prev === null || allImageSources.length === 0) return prev;
      return prev === 0 ? allImageSources.length - 1 : prev - 1;
    });
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => {
      if (prev === null || allImageSources.length === 0) return prev;
      return prev === allImageSources.length - 1 ? 0 : prev + 1;
    });
  };

  const firstAvailableDate = activity.availableDates?.[0];
  const startDate = firstAvailableDate?.start_date ?? null;
  const endDate = firstAvailableDate?.end_date ?? null;
  const isSingleDay = startDate && endDate && startDate === endDate;
  const hasAvailableDate = Boolean(startDate && endDate);

  const whatsappUrl = `https://wa.me/5492944509064?text=${encodeURIComponent(
    `Hola, quiero recibir más información sobre la actividad: ${activity.name}`
  )}`;

  return (
    <>
      <style>
        {`
          .activity-detail-page {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2.5rem 1rem 4rem;
            color: #16324a;
          }

          .activity-detail-title {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 700;
            color: #2d6f9c;
            margin: 0 0 1.5rem;
            line-height: 1.1;
          }

          .activity-detail-top-grid {
            display: grid;
            grid-template-columns: minmax(0, 2fr) minmax(300px, 360px);
            gap: 1.5rem;
            align-items: start;
            margin-bottom: 3rem;
          }

          .activity-detail-gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.75rem;
            min-height: 420px;
          }

          .activity-detail-gallery-grid--with-secondary {
            grid-template-columns: 1.5fr 1fr;
          }

          .activity-detail-main-image-box {
            border-radius: 1rem;
            overflow: hidden;
            background: #dbeafe;
            min-height: 420px;
          }

          .activity-detail-secondary-grid {
            display: grid;
            gap: 0.75rem;
          }

          .activity-detail-secondary-grid--two {
            grid-template-rows: 1fr 1fr;
          }

          .activity-detail-secondary-grid--one {
            grid-template-rows: 1fr;
          }

          .activity-detail-secondary-image-box {
            border-radius: 1rem;
            overflow: hidden;
            background: #e2e8f0;
            min-height: 200px;
          }

          .activity-detail-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            cursor: zoom-in;
          }

          .activity-detail-price-card {
            padding: 1.5rem;
            position: sticky;
            top: 1rem;
          }

          .activity-detail-price-label {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #7c8ea3;
            margin: 0 0 0.35rem;
            font-weight: 700;
          }

          .activity-detail-price {
            font-size: 2.5rem;
            font-weight: 800;
            color: #25608f;
            margin: 0 0 1rem;
            line-height: 1;
          }

          .activity-detail-price--no-price {
            font-size: 2rem;
          }

          .activity-detail-info-list {
            display: grid;
            gap: 0.7rem;
            font-size: 1rem;
            color: #38536b;
            margin-bottom: 1.25rem;
          }

          .activity-detail-info-list p {
            margin: 0;
          }

          .activity-detail-whatsapp-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.65rem;
            width: 100%;
            margin-top: 1.25rem;
            padding: 0.95rem 1rem;
            background-color: #25D366;
            color: #ffffff;
            border-radius: 9999px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1rem;
            box-shadow: 0 10px 20px rgba(37, 211, 102, 0.25);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .activity-detail-whatsapp-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 24px rgba(37, 211, 102, 0.32);
          }

          .activity-detail-section {
            margin-bottom: 3rem;
          }

          .activity-detail-card-padding {
            padding: 1.5rem 1.75rem;
          }

          .activity-detail-summary-card {
            padding: 1.75rem;
          }

          .activity-detail-summary-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2d6f9c;
            margin-top: 0;
            margin-bottom: 1.25rem;
            line-height: 1.3;
            white-space: pre-wrap;
          }

          .activity-detail-description {
            line-height: 1.9;
            color: #060f17;
            font-size: 1.05rem;
          }

          .activity-detail-extra-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
          }

          .activity-detail-small-card {
            padding: 1.5rem;
          }

          .activity-detail-small-card-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #25608f;
            margin-top: 0;
            margin-bottom: 1rem;
          }

          .activity-detail-technical-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
          }

          .activity-detail-technical-card {
            padding: 1.2rem;
          }

          .activity-detail-technical-label {
            margin: 0 0 0.35rem 0;
            font-size: 0.9rem;
            color: #6b8094;
            font-weight: 600;
          }

          .activity-detail-technical-value {
            margin: 0;
            font-size: 1.05rem;
            color: #1f3c56;
            font-weight: 700;
          }

          .activity-detail-modal {
            position: fixed;
            inset: 0;
            background-color: rgba(15, 23, 42, 0.88);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            z-index: 9999;
            cursor: zoom-out;
          }

          .activity-detail-modal-close {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            background: rgba(255,255,255,0.15);
            border: none;
            color: #fff;
            font-size: 2rem;
            width: 48px;
            height: 48px;
            border-radius: 9999px;
            cursor: pointer;
          }

          .activity-detail-modal-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.18);
            border: none;
            color: #fff;
            font-size: 3rem;
            width: 56px;
            height: 56px;
            border-radius: 9999px;
            cursor: pointer;
            line-height: 1;
          }

          .activity-detail-modal-arrow--left {
            left: 1.25rem;
          }

          .activity-detail-modal-arrow--right {
            right: 1.25rem;
          }

          .activity-detail-modal-image {
            max-width: 95vw;
            max-height: 90vh;
            border-radius: 1rem;
            box-shadow: 0 20px 50px rgba(0,0,0,0.35);
            object-fit: contain;
            cursor: default;
          }

          .activity-detail-modal-counter {
            position: absolute;
            bottom: 1.25rem;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15,23,42,0.75);
            color: #fff;
            padding: 0.35rem 0.8rem;
            border-radius: 9999px;
            font-size: 0.9rem;
            font-weight: 600;
          }

          @media (max-width: 900px) {
            .activity-detail-page {
              padding: 2rem 1rem 3rem;
            }

            .activity-detail-top-grid {
              grid-template-columns: 1fr;
              gap: 1.25rem;
              margin-bottom: 2.5rem;
            }

            .activity-detail-price-card {
              position: static;
            }

            .activity-detail-gallery-grid,
            .activity-detail-gallery-grid--with-secondary {
              grid-template-columns: 1fr;
              min-height: auto;
            }

            .activity-detail-main-image-box {
              min-height: auto;
              height: 360px;
            }

            .activity-detail-secondary-grid,
            .activity-detail-secondary-grid--one,
            .activity-detail-secondary-grid--two {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              grid-template-rows: none;
            }

            .activity-detail-secondary-image-box {
              min-height: auto;
              height: 180px;
            }

            .activity-detail-extra-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 600px) {
            .activity-detail-page {
              padding: 1.5rem 0.85rem 2.5rem;
            }

            .activity-detail-title {
              text-align: center;
              margin-bottom: 1.2rem;
            }

            .activity-detail-main-image-box {
              height: 260px;
              border-radius: 0.85rem;
            }

            .activity-detail-secondary-grid,
            .activity-detail-secondary-grid--one,
            .activity-detail-secondary-grid--two {
              grid-template-columns: 1fr;
            }

            .activity-detail-secondary-image-box {
              height: 190px;
              border-radius: 0.85rem;
            }

            .activity-detail-price-card {
              padding: 1.25rem;
            }

            .activity-detail-price {
              font-size: 2rem;
            }

            .activity-detail-price--no-price {
              font-size: 1.65rem;
            }

            .activity-detail-info-list {
              font-size: 0.95rem;
            }

            .activity-detail-summary-card,
            .activity-detail-card-padding,
            .activity-detail-small-card {
              padding: 1.2rem;
            }

            .activity-detail-summary-title {
              font-size: 1.45rem;
            }

            .activity-detail-description {
              font-size: 1rem;
            }

            .activity-detail-section {
              margin-bottom: 2.2rem;
            }

            .activity-detail-small-card-title {
              font-size: 1.3rem;
            }

            .activity-detail-technical-grid {
              grid-template-columns: 1fr;
            }

            .activity-detail-modal {
              padding: 1rem;
            }

            .activity-detail-modal-image {
              max-width: 96vw;
              max-height: 78vh;
              border-radius: 0.75rem;
            }

            .activity-detail-modal-close {
              top: 0.75rem;
              right: 0.75rem;
              width: 42px;
              height: 42px;
              font-size: 1.7rem;
            }

            .activity-detail-modal-arrow {
              width: 42px;
              height: 42px;
              font-size: 2.2rem;
              top: auto;
              bottom: 1rem;
              transform: none;
            }

            .activity-detail-modal-arrow--left {
              left: 1rem;
            }

            .activity-detail-modal-arrow--right {
              right: 1rem;
            }

            .activity-detail-modal-counter {
              bottom: 1.2rem;
              font-size: 0.8rem;
            }
          }
        `}
      </style>

      <section className="activity-detail-page">
        <h1 className="activity-detail-title">{activity.name}</h1>

        <div className="activity-detail-top-grid">
          <div>
            <div
              className={`activity-detail-gallery-grid ${
                secondaryTopImages.length > 0
                  ? 'activity-detail-gallery-grid--with-secondary'
                  : ''
              }`}
            >
              <div
                className="activity-detail-main-image-box"
                style={cardStyle}
              >
                {mainTopImage ? (
                  <img
                    src={mainTopImage}
                    alt={activity.name}
                    onClick={() => setSelectedImageIndex(0)}
                    className="activity-detail-image"
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '260px',
                      background: 'linear-gradient(135deg, #60a5fa, #0ea5e9)',
                    }}
                  />
                )}
              </div>

              {secondaryTopImages.length > 0 && (
                <div
                  className={`activity-detail-secondary-grid ${
                    secondaryTopImages.length === 1
                      ? 'activity-detail-secondary-grid--one'
                      : 'activity-detail-secondary-grid--two'
                  }`}
                >
                  {secondaryTopImages.map((src, index) => (
                    <div
                      key={src}
                      className="activity-detail-secondary-image-box"
                      style={cardStyle}
                    >
                      <img
                        src={src}
                        alt={activity.name}
                        onClick={() => setSelectedImageIndex(index + 1)}
                        className="activity-detail-image"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside
            className="activity-detail-price-card"
            style={cardStyle}
          >
            <p className="activity-detail-price-label">
              {hasPrice ? 'Desde' : 'Precio'}
            </p>

            <p
              className={`activity-detail-price ${
                !hasPrice ? 'activity-detail-price--no-price' : ''
              }`}
            >
              {hasPrice
                ? `${activity.price_currency ?? 'ARS'} ${formattedPrice}`
                : 'Próximamente'}
            </p>

            <div className="activity-detail-info-list">
              <p>
                <strong>Ubicación:</strong> {activity.location}
              </p>

              {hasAvailableDate && isSingleDay && (
                <p>
                  <strong>Fecha:</strong> {formatDate(startDate)}
                </p>
              )}

              {hasAvailableDate && !isSingleDay && (
                <>
                  <p>
                    <strong>Inicio:</strong> {formatDate(startDate)}
                  </p>
                  <p>
                    <strong>Fin:</strong> {formatDate(endDate)}
                  </p>
                </>
              )}

              {!hasAvailableDate && (
                <p>
                  <strong>Fecha:</strong> Próximamente
                </p>
              )}

              {activity.activity_type && (
                <p>
                  <strong>Tipo:</strong> {activity.activity_type}
                </p>
              )}

              {activity.duration_hours && (
                <p>
                  <strong>Duración:</strong> {activity.duration_hours} horas
                </p>
              )}

              {activity.distance && (
                <p>
                  <strong>Distancia a Recorrer:</strong> {activity.distance}
                </p>
              )}

              {activity.activity_days && (
                <p>
                  <strong>Días de actividad:</strong> {activity.activity_days}
                </p>
              )}

              {activity.technical_difficulty && (
                <p>
                  <strong>Dificultad técnica:</strong>{' '}
                  {activity.technical_difficulty}
                </p>
              )}

              {activity.effort_level && (
                <p>
                  <strong>Nivel de esfuerzo:</strong> {activity.effort_level}
                </p>
              )}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="activity-detail-whatsapp-button"
            >
              <FaWhatsapp
                size={23}
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              />

              Mas Informacion
            </a>
          </aside>
        </div>

        {(activity.summary || activity.description) && (
          <section className="activity-detail-section">
            <div className="activity-detail-summary-card" style={cardStyle}>
              {activity.summary && (
                <h2 className="activity-detail-summary-title">
                  {activity.summary}
                </h2>
              )}

              {activity.description && (
                <div className="activity-detail-description">
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

        {activity.what_you_will_do && (
          <section className="activity-detail-section">
            <h2 style={sectionTitleStyle}>¿Qué vas a hacer?</h2>
            <div
              className="activity-detail-card-padding"
              style={{
                ...cardStyle,
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

        {activity.important_info && (
          <section className="activity-detail-section">
            <h2 style={sectionTitleStyle}>Información importante</h2>
            <div
              className="activity-detail-card-padding"
              style={{
                ...cardStyle,
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

        <div className="activity-detail-extra-grid">
          {activity.includes && (
            <section className="activity-detail-small-card" style={cardStyle}>
              <h2 className="activity-detail-small-card-title">Incluye</h2>
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
            <section className="activity-detail-small-card" style={cardStyle}>
              <h2 className="activity-detail-small-card-title">No incluye</h2>
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
            <section className="activity-detail-small-card" style={cardStyle}>
              <h2 className="activity-detail-small-card-title">
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
            <section className="activity-detail-small-card" style={cardStyle}>
              <h2 className="activity-detail-small-card-title">Alojamiento</h2>
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
            <section className="activity-detail-small-card" style={cardStyle}>
              <h2 className="activity-detail-small-card-title">Traslado</h2>
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
            <section className="activity-detail-small-card" style={cardStyle}>
              <h2 className="activity-detail-small-card-title">
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
          <section className="activity-detail-section">
            <h2 style={sectionTitleStyle}>Puntos de encuentro</h2>

            <div className="activity-detail-card-padding" style={cardStyle}>
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
                {activity.has_multiple_meeting_points &&
                  activity.meeting_point_2 && <li>{activity.meeting_point_2}</li>}
              </ul>
            </div>
          </section>
        )}

        <section>
          <h2 style={sectionTitleStyle}>Información técnica</h2>

          <div className="activity-detail-technical-grid">
            {[
              activity.activity_type
                ? { label: 'Tipo de actividad', value: activity.activity_type }
                : null,
              activity.duration_hours
                ? {
                    label: 'Duración',
                    value: `${activity.duration_hours} horas`,
                  }
                : null,
              activity.distance
                ? { label: 'Distancia', value: activity.distance }
                : null,
              activity.activity_days
                ? {
                    label: 'Días de actividad',
                    value: `${activity.activity_days}`,
                  }
                : null,
              activity.technical_difficulty
                ? {
                    label: 'Dificultad técnica',
                    value: activity.technical_difficulty,
                  }
                : null,
              activity.effort_level
                ? { label: 'Nivel de esfuerzo', value: activity.effort_level }
                : null,
            ]
              .filter(Boolean)
              .map((item, index) => (
                <div
                  key={index}
                  className="activity-detail-technical-card"
                  style={cardStyle}
                >
                  <p className="activity-detail-technical-label">
                    {item!.label}
                  </p>
                  <p className="activity-detail-technical-value">
                    {item!.value}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {selectedImageIndex !== null && allImageSources[selectedImageIndex] && (
          <div
            onClick={() => setSelectedImageIndex(null)}
            className="activity-detail-modal"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(null);
              }}
              className="activity-detail-modal-close"
              aria-label="Cerrar imagen"
            >
              ×
            </button>

            {allImageSources.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                className="activity-detail-modal-arrow activity-detail-modal-arrow--left"
                aria-label="Imagen anterior"
              >
                ‹
              </button>
            )}

            <img
              src={allImageSources[selectedImageIndex]}
              alt="Vista ampliada"
              onClick={(e) => e.stopPropagation()}
              className="activity-detail-modal-image"
            />

            {allImageSources.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className="activity-detail-modal-arrow activity-detail-modal-arrow--right"
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            )}

            {allImageSources.length > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="activity-detail-modal-counter"
              >
                {selectedImageIndex + 1} / {allImageSources.length}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default ActivityDetail;