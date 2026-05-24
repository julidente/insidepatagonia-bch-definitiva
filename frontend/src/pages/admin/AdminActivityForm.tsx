import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { ActivityCreate, Activity } from '../../types/activity';
import { createActivity, getActivityById, updateActivity } from '../../services/activity.service';
import {
  uploadActivityImage,
  deleteActivityImage,
} from '../../services/image.service';

const API_URL = import.meta.env.VITE_API_URL;
const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

interface Props {
  mode: 'create' | 'edit';
}

type AdminActivityFormData = ActivityCreate & {
  start_date?: string;
  end_date?: string;
};

const AdminActivityForm = ({ mode }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState<string | null>(null);
  const [hasMultipleMeetingPoints, setHasMultipleMeetingPoints] = useState(false);
  const [hasAdditionalCost, setHasAdditionalCost] = useState(false);
  const [withoutPrice, setWithoutPrice] = useState(false);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<Activity['images']>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdminActivityFormData>({
    defaultValues: {
      name: '',
      summary: '',
      description: '',
      location: '',
      has_multiple_meeting_points: false,
      meeting_point_1: '',
      meeting_point_2: '',
      activity_type: '',
      duration_hours: null,
      has_additional_cost: false,
      additional_cost: '',
      includes: '',
      not_includes: '',
      what_you_will_do: '',
      accommodation_detail: '',
      transfer_detail: '',
      important_info: '',
      tips: '',
      technical_difficulty: '',
      effort_level: '',
      distance: '',
      activity_days: 1,
      accommodation_days: null,
      accommodation_type: '',
      transport_type: '',
      price: null,
      price_currency: 'ARS',
      price_additional_info: '',
      start_date: '',
      end_date: '',
    },
  });

  const watchedMultiple = watch('has_multiple_meeting_points');
  const watchedAdditionalCost = watch('has_additional_cost');

  useEffect(() => {
    setHasMultipleMeetingPoints(Boolean(watchedMultiple));
  }, [watchedMultiple]);

  useEffect(() => {
    setHasAdditionalCost(Boolean(watchedAdditionalCost));
  }, [watchedAdditionalCost]);

  useEffect(() => {
    if (mode === 'edit' && id) {
      (async () => {
        try {
          const data: Activity = await getActivityById(id);
          const firstAvailableDate = data.availableDates?.[0];

          reset({
            name: data.name,
            summary: data.summary ?? '',
            description: data.description ?? '',
            location: data.location,
            has_multiple_meeting_points: data.has_multiple_meeting_points,
            meeting_point_1: data.meeting_point_1 ?? '',
            meeting_point_2: data.meeting_point_2 ?? '',
            activity_type: data.activity_type,
            duration_hours: data.duration_hours ?? null,
            has_additional_cost: data.has_additional_cost ?? false,
            additional_cost: data.additional_cost ?? '',
            includes: data.includes ?? '',
            not_includes: data.not_includes ?? '',
            what_you_will_do: data.what_you_will_do ?? '',
            accommodation_detail: data.accommodation_detail ?? '',
            transfer_detail: data.transfer_detail ?? '',
            important_info: data.important_info ?? '',
            tips: data.tips ?? '',
            technical_difficulty: data.technical_difficulty ?? '',
            effort_level: data.effort_level ?? '',
            distance: data.distance ?? '',
            activity_days: data.activity_days ?? null,
            accommodation_days: data.accommodation_days ?? null,
            accommodation_type: data.accommodation_type ?? '',
            transport_type: data.transport_type ?? '',
            price: data.price === null || data.price === undefined ? null : Number(data.price),
            price_currency: data.price_currency ?? 'ARS',
            price_additional_info: data.price_additional_info ?? '',
            start_date: firstAvailableDate?.start_date ?? '',
            end_date: firstAvailableDate?.end_date ?? '',
          });

          setWithoutPrice(data.price === null || data.price === undefined);
          setExistingImages(data.images ?? []);
        } catch (err) {
          console.error(err);
          setError('No se pudo cargar la actividad.');
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setWithoutPrice(false);
      setLoading(false);
    }
  }, [mode, id, reset]);

  const handleDeleteImage = async (imageId: number | string) => {
    const confirmDelete = window.confirm('¿Querés eliminar esta imagen?');
    if (!confirmDelete) return;

    try {
      setError(null);
      await deleteActivityImage(imageId);
      setExistingImages((prev) => prev?.filter((img) => img.image_id !== imageId) ?? []);
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar la imagen.');
    }
  };

  const onSubmit = async (data: AdminActivityFormData) => {
    try {
      setError(null);

      if (mode === 'create' && !coverFile) {
        setError('La imagen de portada es obligatoria.');
        return;
      }

      const hasStartDate = Boolean(data.start_date);
      const hasEndDate = Boolean(data.end_date);

      if ((hasStartDate && !hasEndDate) || (!hasStartDate && hasEndDate)) {
        setError('Si cargás fechas, debés completar inicio y fin.');
        return;
      }

      if (hasStartDate && hasEndDate && data.end_date! < data.start_date!) {
        setError('La fecha de fin no puede ser menor que la fecha de inicio.');
        return;
      }

      const toOptionalNumber = (value: unknown) => {
        if (value === '' || value === null || value === undefined) {
          return null;
        }

      const numberValue = Number(value);

        if (Number.isNaN(numberValue) || numberValue <= 0) {
          return null;
        }

        return numberValue;
      };

      const cleanPrice = withoutPrice ? null : toOptionalNumber(data.price);
      const cleanDuration = toOptionalNumber(data.duration_hours);
      const cleanActivityDays = toOptionalNumber(data.activity_days);
      const cleanAccommodationDays = toOptionalNumber(data.accommodation_days);

      const payload: ActivityCreate = {
        name: data.name,
        summary: data.summary,
        description: data.description,
        location: data.location,
        has_multiple_meeting_points: data.has_multiple_meeting_points,
        meeting_point_1: data.meeting_point_1,
        meeting_point_2: data.has_multiple_meeting_points ? data.meeting_point_2 : '',
        activity_type: data.activity_type,
        duration_hours: cleanDuration,
        has_additional_cost: data.has_additional_cost ?? false,
        additional_cost: data.has_additional_cost ? data.additional_cost : '',
        includes: data.includes,
        not_includes: data.not_includes,
        what_you_will_do: data.what_you_will_do,
        accommodation_detail: data.accommodation_detail,
        transfer_detail: data.transfer_detail,
        important_info: data.important_info,
        tips: data.tips,
        technical_difficulty: data.technical_difficulty,
        effort_level: data.effort_level,
        distance: data.distance,
        activity_days: cleanActivityDays,
        accommodation_days: cleanAccommodationDays,
        accommodation_type: data.accommodation_type,
        transport_type: data.transport_type,
        price: cleanPrice,
        price_currency: data.price_currency ?? 'ARS',
        price_additional_info: data.price_additional_info,
        availableDates:
          hasStartDate && hasEndDate
            ? [
                {
                  start_date: data.start_date!,
                  end_date: data.end_date!,
                },
              ]
            : [],
      };

      let activityId: string | number;

      if (mode === 'create') {
        const created = await createActivity(payload);
        activityId = created.activity_id;
      } else if (mode === 'edit' && id) {
        const updated = await updateActivity(id, payload);
        activityId = updated?.activity_id ?? id;
      } else {
        return;
      }

      if (coverFile) {
        await uploadActivityImage(activityId, coverFile, true);
      }

      for (const file of galleryFiles) {
        await uploadActivityImage(activityId, file, false);
      }

      navigate('/admin/activities');
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : 'Error al guardar la actividad o subir las imágenes.',
      );
    }
  };

  if (loading) {
    return <p style={{ padding: '2rem 1rem' }}>Cargando actividad...</p>;
  }

  return (
    <section
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <h1 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '1rem' }}>
        {mode === 'create' ? 'Crear nueva actividad' : 'Editar actividad'}
      </h1>

      {error && <p style={{ color: 'crimson', marginBottom: '0.75rem' }}>{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <div>
          <label>Título</label>
          <input
            type="text"
            {...register('name', { required: 'El título es obligatorio' })}
            style={inputStyle}
          />
          {errors.name && <p style={errorStyle}>{String(errors.name.message)}</p>}
        </div>

        <div>
          <label>Resumen</label>
          <input type="text" {...register('summary')} style={inputStyle} />
        </div>

        <div>
          <label>Descripción</label>
          <textarea rows={10} {...register('description')} style={textareaStyle} />
        </div>

        <div>
          <label>Ubicación</label>
          <input
            type="text"
            {...register('location', { required: 'La ubicación es obligatoria' })}
            style={inputStyle}
          />
          {errors.location && <p style={errorStyle}>{String(errors.location.message)}</p>}
        </div>

        <div>
          <label>Tipo de actividad</label>
          <select
            {...register('activity_type', { required: 'El tipo de actividad es obligatorio' })}
            style={inputStyle}
          >
            <option value="">Seleccioná un tipo</option>
            <option value="senderismo">Senderismo</option>
            <option value="kayak">Kayak</option>
            <option value="mtb">MTB bicicleta</option>
            <option value="fotografía">Fotografía</option>
            <option value="raqueta de nieve">Raqueta de nieve</option>
            <option value="trekking">Trekking</option>
            <option value="multiactividad">Multiactividad</option>
          </select>
          {errors.activity_type && (
            <p style={errorStyle}>{String(errors.activity_type.message)}</p>
          )}
        </div>

        <div style={gridStyle}>
          <div>
            <label>Duración en horas (no obligatorio)</label>
            <input
              type="number"
              {...register('duration_hours', {
                setValueAs: (value) => value === '' ? null : Number(value),
              })}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Precio</label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0.35rem 0',
                fontSize: '0.9rem',
                color: '#334155',
              }}
            >
              <input
                type="checkbox"
                checked={withoutPrice}
                onChange={(e) => setWithoutPrice(e.target.checked)}
              />
              Sin precio / Próximamente
            </label>

            <input
              type="number"
              step="1"
              disabled={withoutPrice}
              {...register('price', {
                setValueAs: (value) => value === '' ? null : Number(value),
              })}
              style={{
                ...inputStyle,
                backgroundColor: withoutPrice ? '#e2e8f0' : 'white',
                cursor: withoutPrice ? 'not-allowed' : 'text',
              }}
            />

            {errors.price && <p style={errorStyle}>{String(errors.price.message)}</p>}
          </div>

          <div>
            <label>Moneda</label>
            <select {...register('price_currency')} style={inputStyle}>
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        <div style={gridStyle}>
          <div>
            <label>Fecha de inicio</label>
            <input type="date" {...register('start_date')} style={inputStyle} />
            {errors.start_date && <p style={errorStyle}>{String(errors.start_date.message)}</p>}
          </div>

          <div>
            <label>Fecha de fin</label>
            <input type="date" {...register('end_date')} style={inputStyle} />
            {errors.end_date && <p style={errorStyle}>{String(errors.end_date.message)}</p>}
          </div>
        </div>

        <div>
          <label>¿Hay costo adicional?</label>
          <select
            {...register('has_additional_cost', {
              setValueAs: (value) => value === 'true',
            })}
            style={inputStyle}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        {hasAdditionalCost && (
          <div>
            <label>Detalle del costo adicional</label>
            <textarea
              rows={3}
              {...register('additional_cost')}
              style={textareaStyle}
              placeholder="Ej: entrada al parque, alquiler de equipo, traslado opcional, etc."
            />
            {errors.additional_cost && (
              <p style={errorStyle}>{String(errors.additional_cost.message)}</p>
            )}
          </div>
        )}

        <div>
          <label>¿Hay más de un lugar de encuentro?</label>
          <select
            {...register('has_multiple_meeting_points', {
              setValueAs: (value) => value === 'true',
            })}
            style={inputStyle}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>Lugar de encuentro 1</label>
          <input
            type="text"
            {...register('meeting_point_1', { required: 'El lugar de encuentro es obligatorio' })}
            style={inputStyle}
          />
          {errors.meeting_point_1 && (
            <p style={errorStyle}>{String(errors.meeting_point_1.message)}</p>
          )}
        </div>

        {hasMultipleMeetingPoints && (
          <div>
            <label>Lugar de encuentro 2</label>
            <input type="text" {...register('meeting_point_2')} style={inputStyle} />
          </div>
        )}

        <div>
          <label>Incluye</label>
          <textarea rows={3} {...register('includes')} style={textareaStyle} />
        </div>

        <div>
          <label>No incluye</label>
          <textarea rows={3} {...register('not_includes')} style={textareaStyle} />
        </div>

        <div>
          <label>¿Qué vas a hacer?</label>
          <textarea rows={10} {...register('what_you_will_do')} style={textareaStyle} />
        </div>

        <div>
          <label>Alojamiento</label>
          <textarea
            rows={3}
            {...register('accommodation_detail')}
            style={textareaStyle}
            maxLength={200}
            placeholder="Detalle del alojamiento"
          />
          {errors.accommodation_detail && (
            <p style={errorStyle}>{String(errors.accommodation_detail.message)}</p>
          )}
        </div>

        <div>
          <label>Traslado</label>
          <textarea
            rows={3}
            {...register('transfer_detail')}
            style={textareaStyle}
            maxLength={200}
            placeholder="Detalle del traslado"
          />
          {errors.transfer_detail && (
            <p style={errorStyle}>{String(errors.transfer_detail.message)}</p>
          )}
        </div>

        <div>
          <label>Tips para la actividad</label>
          <textarea
            rows={3}
            {...register('tips')}
            style={textareaStyle}
            maxLength={150}
            placeholder="Ej: llevar agua, calzado cómodo, abrigo, protector solar..."
          />
          {errors.tips && <p style={errorStyle}>{String(errors.tips.message)}</p>}
        </div>

        <div>
          <label>Información importante</label>
          <textarea
            rows={10}
            {...register('important_info')}
            style={textareaStyle}
            placeholder="Ej: requisitos físicos, condiciones especiales, restricciones o recomendaciones importantes"
          />
          {errors.important_info && (
            <p style={errorStyle}>{String(errors.important_info.message)}</p>
          )}
        </div>

        <div style={gridStyle}>
          <div>
            <label>Dificultad técnica</label>
            <select {...register('technical_difficulty')} style={inputStyle}>
              <option value="">Seleccioná</option>
              <option value="baja">Baja</option>
              <option value="moderada">Moderada</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label>Nivel de esfuerzo</label>
            <select {...register('effort_level')} style={inputStyle}>
              <option value="">Seleccioná</option>
              <option value="muy bajo">Muy bajo</option>
              <option value="bajo">Bajo</option>
              <option value="moderado">Moderado</option>
              <option value="exigente">Exigente</option>
              <option value="muy exigente">Muy exigente</option>
            </select>
          </div>
        </div>

        <div style={gridStyle}>
          <div>
            <label>Distancia a recorrer (no obligatorio)</label>
            <input
              type="text"
              {...register('distance')}
              style={inputStyle}
              placeholder="Ej: 8 km"
            />
          </div>

          <div>
            <label>Días de actividad</label>
            <input
              type="number"
              {...register('activity_days', {
                setValueAs: (value) => value === '' ? null : Number(value),
              })}
              style={inputStyle}
            />
          </div>
        </div>

        {mode === 'edit' && existingImages && existingImages.length > 0 && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
              Imágenes actuales
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
              }}
            >
              {existingImages.map((img) => {
                const src = img.url?.startsWith('http')
                  ? img.url
                  : `${API_ORIGIN}${img.url}`;

                return (
                  <div
                    key={img.image_id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      background: '#fff',
                    }}
                  >
                    <img
                      src={src}
                      alt="Imagen de actividad"
                      style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem',
                      }}
                    />

                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#475569',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {img.is_cover ? 'Portada' : 'Galería'}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.image_id)}
                      style={{
                        borderRadius: '0.375rem',
                        border: 'none',
                        background: '#dc2626',
                        color: 'white',
                        padding: '0.45rem 0.7rem',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <label>Imagen de portada {mode === 'create' ? '*' : '(opcional para reemplazar)'}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setCoverFile(file);
            }}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Imágenes adicionales</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              setGalleryFiles(files);
            }}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: '0.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            background: '#0f766e',
            color: 'white',
            padding: '0.5rem 0.75rem',
            fontSize: '0.9rem',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  borderRadius: '0.375rem',
  border: '1px solid #cbd5e1',
  fontSize: '0.9rem',
  padding: '0.35rem 0.5rem',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical' as const,
};

const errorStyle = {
  color: 'crimson',
  fontSize: '0.8rem',
};

const gridStyle = {
  display: 'grid',
  gap: '0.75rem',
  gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
};

export default AdminActivityForm;