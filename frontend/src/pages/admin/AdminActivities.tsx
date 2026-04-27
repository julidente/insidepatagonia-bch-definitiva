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

  return (
    <section
      style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600 }}>Actividades</h1>

        <Link
          to="/admin/activities/new"
          style={{
            backgroundColor: '#0369a1',
            color: 'white',
            fontSize: '0.9rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
          }}
        >
          + Nueva actividad
        </Link>
      </div>

      {loading && <p>Cargando actividades...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.85rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            overflow: 'hidden',
          }}
        >
          <thead style={{ backgroundColor: '#e2e8f0' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Título</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Ubicación</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Tipo</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Precio</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Imágenes</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((a) => {
              const imagesCount = a.images?.length ?? 0;
              const formattedPrice = Number(a.price).toLocaleString('es-AR');

              return (
                <tr key={a.activity_id} style={{ borderTop: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.5rem' }}>{a.activity_id}</td>
                  <td style={{ padding: '0.5rem' }}>{a.name}</td>
                  <td style={{ padding: '0.5rem' }}>{a.location}</td>
                  <td style={{ padding: '0.5rem' }}>{a.activity_type}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {a.price_currency} {formattedPrice}
                  </td>
                  <td style={{ padding: '0.5rem' }}>{imagesCount}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <Link
                      to={`/admin/activities/${a.activity_id}/edit`}
                      style={{
                        marginRight: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#0369a1',
                      }}
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(a.activity_id)}
                      style={{
                        fontSize: '0.8rem',
                        color: 'crimson',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AdminActivities;
