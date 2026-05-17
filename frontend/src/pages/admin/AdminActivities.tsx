import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivities, deleteActivity } from '../../services/activity.service';
import type { Activity } from '../../types/activity';

const AdminActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getActivities();
      const parsed: Activity[] = Array.isArray(data) ? data.map((a) => a) : [];
      setActivities(parsed);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError('Error al cargar las actividades.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: Activity['activity_id']) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta actividad?')) return;

    try {
      await deleteActivity(id);
      await load();
    } catch (err: any) {
      console.error(err);
      alert('No se pudo eliminar la actividad.');
    }
  };

  const formatPrice = (activity: Activity) => {
    const hasPrice =
      activity.price !== null &&
      activity.price !== undefined &&
      activity.price !== '' &&
      Number.isFinite(Number(activity.price));

    if (!hasPrice) return 'Próximamente';

    return `${activity.price_currency ?? 'ARS'} ${Number(
      activity.price
    ).toLocaleString('es-AR')}`;
  };

  return (
    <>
      <style>
        {`
          .admin-activities-page {
            max-width: 1120px;
            margin: 0 auto;
            padding: 2.3rem 1rem 3rem;
          }

          .admin-activities-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.7rem;
          }

          .admin-activities-title {
            font-size: clamp(1.8rem, 5vw, 2.4rem);
            font-weight: 800;
            margin: 0 0 0.45rem;
            color: #0f172a;
            line-height: 1.15;
          }

          .admin-activities-description {
            margin: 0;
            color: #475569;
            font-size: 0.98rem;
            line-height: 1.6;
          }

          .admin-activities-new-button {
            background-color: #0369a1;
            color: white;
            font-size: 0.95rem;
            font-weight: 800;
            padding: 0.8rem 1.1rem;
            border-radius: 9999px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 20px rgba(3, 105, 161, 0.22);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .admin-activities-new-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 26px rgba(3, 105, 161, 0.3);
          }

          .admin-activities-message {
            color: #475569;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 1rem;
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
          }

          .admin-activities-error {
            color: #991b1b;
            background-color: #fee2e2;
            border: 1px solid #fecaca;
            border-radius: 14px;
            padding: 1rem;
          }

          .admin-activities-table-wrapper {
            width: 100%;
            overflow-x: auto;
            background-color: white;
            border-radius: 16px;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
          }

          .admin-activities-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.88rem;
            min-width: 880px;
          }

          .admin-activities-table thead {
            background-color: #e2e8f0;
          }

          .admin-activities-table th {
            text-align: left;
            padding: 0.75rem;
            color: #334155;
            font-weight: 800;
            white-space: nowrap;
          }

          .admin-activities-table td {
            padding: 0.75rem;
            color: #475569;
            vertical-align: middle;
            border-top: 1px solid #e2e8f0;
          }

          .admin-activities-table-title {
            color: #0f172a;
            font-weight: 800;
          }

          .admin-activities-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .admin-activities-action {
            border: none;
            border-radius: 9999px;
            padding: 0.45rem 0.75rem;
            font-size: 0.82rem;
            font-weight: 800;
            cursor: pointer;
            text-decoration: none;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }

          .admin-activities-action:hover {
            transform: translateY(-1px);
          }

          .admin-activities-action--edit {
            background-color: #e0f2fe;
            color: #0369a1;
          }

          .admin-activities-action--delete {
            background-color: #fee2e2;
            color: #b91c1c;
          }

          .admin-activities-cards {
            display: none;
          }

          .admin-activity-card {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 1rem;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
          }

          .admin-activity-card-title {
            font-size: 1.15rem;
            font-weight: 800;
            margin: 0 0 0.8rem;
            color: #0f172a;
            line-height: 1.3;
          }

          .admin-activity-card-grid {
            display: grid;
            gap: 0.55rem;
            margin-bottom: 1rem;
          }

          .admin-activity-card-row {
            display: grid;
            grid-template-columns: 110px minmax(0, 1fr);
            gap: 0.5rem;
            font-size: 0.92rem;
            line-height: 1.45;
          }

          .admin-activity-card-label {
            color: #64748b;
            font-weight: 800;
          }

          .admin-activity-card-value {
            color: #334155;
            word-break: break-word;
          }

          .admin-activity-card-actions {
            display: flex;
            gap: 0.65rem;
          }

          .admin-activity-card-actions .admin-activities-action {
            flex: 1;
            text-align: center;
            padding: 0.65rem 0.8rem;
          }

          @media (max-width: 820px) {
            .admin-activities-page {
              padding: 1.8rem 1rem 2.6rem;
            }

            .admin-activities-header {
              flex-direction: column;
              align-items: stretch;
              text-align: center;
            }

            .admin-activities-new-button {
              width: 100%;
            }

            .admin-activities-table-wrapper {
              display: none;
            }

            .admin-activities-cards {
              display: grid;
              gap: 1rem;
            }
          }

          @media (max-width: 480px) {
            .admin-activities-page {
              padding: 1.4rem 0.85rem 2.3rem;
            }

            .admin-activity-card {
              padding: 0.95rem;
              border-radius: 14px;
            }

            .admin-activity-card-title {
              font-size: 1.05rem;
            }

            .admin-activity-card-row {
              grid-template-columns: 1fr;
              gap: 0.15rem;
            }

            .admin-activity-card-actions {
              flex-direction: column;
            }
          }
        `}
      </style>

      <section className="admin-activities-page">
        <div className="admin-activities-header">
          <div>
            <h1 className="admin-activities-title">Actividades</h1>

            <p className="admin-activities-description">
              Creá, editá y eliminá experiencias turísticas del sitio.
            </p>
          </div>

          <Link to="/admin/activities/new" className="admin-activities-new-button">
            + Nueva actividad
          </Link>
        </div>

        {loading && (
          <p className="admin-activities-message">Cargando actividades...</p>
        )}

        {error && <p className="admin-activities-error">{error}</p>}

        {!loading && !error && activities.length === 0 && (
          <p className="admin-activities-message">
            No hay actividades cargadas todavía.
          </p>
        )}

        {!loading && !error && activities.length > 0 && (
          <>
            <div className="admin-activities-table-wrapper">
              <table className="admin-activities-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Ubicación</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Imágenes</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {activities.map((a) => {
                    const imagesCount = a.images?.length ?? 0;

                    return (
                      <tr key={a.activity_id}>
                        <td>{a.activity_id}</td>

                        <td className="admin-activities-table-title">
                          {a.name}
                        </td>

                        <td>{a.location || '-'}</td>

                        <td>{a.activity_type || '-'}</td>

                        <td>{formatPrice(a)}</td>

                        <td>{imagesCount}</td>

                        <td>
                          <div className="admin-activities-actions">
                            <Link
                              to={`/admin/activities/${a.activity_id}/edit`}
                              className="admin-activities-action admin-activities-action--edit"
                            >
                              Editar
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDelete(a.activity_id)}
                              className="admin-activities-action admin-activities-action--delete"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="admin-activities-cards">
              {activities.map((a) => {
                const imagesCount = a.images?.length ?? 0;

                return (
                  <article key={a.activity_id} className="admin-activity-card">
                    <h2 className="admin-activity-card-title">{a.name}</h2>

                    <div className="admin-activity-card-grid">
                      <div className="admin-activity-card-row">
                        <span className="admin-activity-card-label">ID</span>
                        <span className="admin-activity-card-value">
                          {a.activity_id}
                        </span>
                      </div>

                      <div className="admin-activity-card-row">
                        <span className="admin-activity-card-label">
                          Ubicación
                        </span>
                        <span className="admin-activity-card-value">
                          {a.location || '-'}
                        </span>
                      </div>

                      <div className="admin-activity-card-row">
                        <span className="admin-activity-card-label">Tipo</span>
                        <span className="admin-activity-card-value">
                          {a.activity_type || '-'}
                        </span>
                      </div>

                      <div className="admin-activity-card-row">
                        <span className="admin-activity-card-label">Precio</span>
                        <span className="admin-activity-card-value">
                          {formatPrice(a)}
                        </span>
                      </div>

                      <div className="admin-activity-card-row">
                        <span className="admin-activity-card-label">
                          Imágenes
                        </span>
                        <span className="admin-activity-card-value">
                          {imagesCount}
                        </span>
                      </div>
                    </div>

                    <div className="admin-activity-card-actions">
                      <Link
                        to={`/admin/activities/${a.activity_id}/edit`}
                        className="admin-activities-action admin-activities-action--edit"
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(a.activity_id)}
                        className="admin-activities-action admin-activities-action--delete"
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AdminActivities;