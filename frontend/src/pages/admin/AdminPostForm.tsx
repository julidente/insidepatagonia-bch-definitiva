import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPost,
  deletePostImage,
  getPostById,
  updatePost,
  uploadPostImage,
} from "../../services/post.service";
import type { Post } from "../../types/post";

type AdminPostFormProps = {
  mode: "create" | "edit";
};

export default function AdminPostForm({ mode }: AdminPostFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setCurrentPost(post);
        setTitle(post.title);
        setDescription(post.description);
        setIsPublished(post.is_published);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el artículo.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [mode, id]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setError("");
  };

  const handleDeleteImage = async () => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "¿Seguro que querés eliminar la imagen de portada de este artículo?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingImage(true);
      setError("");

      const updatedPost = await deletePostImage(id);

      setCurrentPost(updatedPost);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la imagen del artículo.");
    } finally {
      setDeletingImage(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    if (!description.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }

    if (mode === "create" && !selectedFile) {
      setError("La imagen es obligatoria.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: title.trim(),
        description: description.trim(),
        is_published: isPublished,
      };

      if (mode === "create") {
        const createdPost = await createPost(payload);

        if (selectedFile) {
          await uploadPostImage(createdPost.post_id, selectedFile);
        }
      } else if (id) {
        await updatePost(id, payload);

        if (selectedFile) {
          await uploadPostImage(id, selectedFile);
        }
      }

      navigate("/admin/posts");
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el artículo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="admin-post-form-page">
        <p>Cargando artículo...</p>
      </main>
    );
  }

  return (
    <>
      <style>
        {`
          .admin-post-form-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 2.3rem 1rem 3rem;
          }

          .admin-post-form-header {
            margin-bottom: 1.5rem;
          }

          .admin-post-form-title {
            font-size: clamp(1.8rem, 5vw, 2.4rem);
            font-weight: 800;
            margin: 0 0 0.5rem;
            color: #0f172a;
            line-height: 1.15;
          }

          .admin-post-form-subtitle {
            margin: 0;
            color: #64748b;
            font-size: 0.98rem;
            line-height: 1.6;
          }

          .admin-post-form-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 16px;
            box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
            display: grid;
            gap: 1.1rem;
          }

          .admin-post-form-field {
            display: grid;
            gap: 0.45rem;
          }

          .admin-post-form-label {
            display: block;
            font-weight: 700;
            color: #334155;
            font-size: 0.95rem;
          }

          .admin-post-form-input,
          .admin-post-form-textarea {
            width: 100%;
            padding: 0.75rem;
            border-radius: 10px;
            border: 1px solid #cbd5e1;
            font-size: 0.95rem;
            outline: none;
            background-color: white;
          }

          .admin-post-form-input:focus,
          .admin-post-form-textarea:focus {
            border-color: #25608f;
            box-shadow: 0 0 0 3px rgba(37, 96, 143, 0.12);
          }

          .admin-post-form-textarea {
            resize: vertical;
            min-height: 260px;
            line-height: 1.6;
          }

          .admin-post-form-image-row {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .admin-post-form-image {
            width: 100%;
            max-width: 320px;
            height: auto;
            border-radius: 12px;
            object-fit: cover;
            border: 1px solid #e2e8f0;
          }

          .admin-post-form-help {
            color: #64748b;
            font-size: 0.9rem;
            margin: 0.4rem 0 0;
            line-height: 1.5;
          }

          .admin-post-form-empty {
            color: #64748b;
            margin: 0;
            background-color: #f8fafc;
            border: 1px dashed #cbd5e1;
            padding: 0.8rem;
            border-radius: 10px;
            line-height: 1.5;
          }

          .admin-post-form-file-input {
            width: 100%;
            max-width: 100%;
            font-size: 0.92rem;
          }

          .admin-post-form-checkbox {
            display: flex;
            align-items: center;
            gap: 0.55rem;
            color: #334155;
            font-weight: 700;
            width: fit-content;
          }

          .admin-post-form-checkbox input {
            width: 18px;
            height: 18px;
          }

          .admin-post-form-error {
            color: #991b1b;
            background-color: #fee2e2;
            border: 1px solid #fecaca;
            border-radius: 10px;
            padding: 0.75rem;
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.5;
          }

          .admin-post-form-actions {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-top: 0.25rem;
          }

          .admin-post-form-button {
            border: none;
            padding: 0.85rem 1.15rem;
            border-radius: 9999px;
            cursor: pointer;
            font-weight: 800;
            font-size: 0.95rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          }

          .admin-post-form-button:hover:not(:disabled) {
            transform: translateY(-2px);
          }

          .admin-post-form-button:disabled {
            cursor: not-allowed;
            opacity: 0.7;
          }

          .admin-post-form-button--primary {
            background-color: #0c4a6e;
            color: white;
            box-shadow: 0 10px 20px rgba(12, 74, 110, 0.22);
          }

          .admin-post-form-button--secondary {
            background-color: #e2e8f0;
            color: #0f172a;
          }

          .admin-post-form-button--danger {
            background-color: #dc2626;
            color: white;
            box-shadow: 0 10px 20px rgba(220, 38, 38, 0.2);
          }

          @media (max-width: 768px) {
            .admin-post-form-page {
              padding: 1.8rem 1rem 2.6rem;
            }

            .admin-post-form-header {
              text-align: center;
            }

            .admin-post-form-card {
              padding: 1.25rem;
              border-radius: 14px;
            }

            .admin-post-form-textarea {
              min-height: 240px;
            }

            .admin-post-form-image-row {
              flex-direction: column;
              align-items: stretch;
            }

            .admin-post-form-image {
              max-width: 100%;
            }

            .admin-post-form-actions {
              flex-direction: column;
            }

            .admin-post-form-button {
              width: 100%;
            }
          }

          @media (max-width: 480px) {
            .admin-post-form-page {
              padding: 1.4rem 0.85rem 2.3rem;
            }

            .admin-post-form-card {
              padding: 1rem;
            }

            .admin-post-form-input,
            .admin-post-form-textarea {
              font-size: 1rem;
            }

            .admin-post-form-textarea {
              min-height: 220px;
            }
          }
        `}
      </style>

      <main className="admin-post-form-page">
        <div className="admin-post-form-header">
          <h1 className="admin-post-form-title">
            {mode === "create" ? "Nuevo artículo" : "Editar artículo"}
          </h1>

          <p className="admin-post-form-subtitle">
            {mode === "create"
              ? "Cargá el contenido del nuevo artículo del blog informativo."
              : "Modificá el contenido, estado o imagen de portada del artículo."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-post-form-card">
          <div className="admin-post-form-field">
            <label className="admin-post-form-label">Título</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-post-form-input"
            />
          </div>

          <div className="admin-post-form-field">
            <label className="admin-post-form-label">Descripción</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              className="admin-post-form-textarea"
            />
          </div>

          {mode === "edit" && currentPost?.cover_image_url && (
            <div className="admin-post-form-field">
              <label className="admin-post-form-label">Imagen actual</label>

              <div className="admin-post-form-image-row">
                <img
                  src={currentPost.cover_image_url}
                  alt={currentPost.title}
                  className="admin-post-form-image"
                />

                <button
                  type="button"
                  onClick={handleDeleteImage}
                  disabled={deletingImage || saving}
                  className="admin-post-form-button admin-post-form-button--danger"
                >
                  {deletingImage ? "Eliminando..." : "Eliminar imagen"}
                </button>
              </div>
            </div>
          )}

          {mode === "edit" && !currentPost?.cover_image_url && (
            <p className="admin-post-form-empty">
              Este artículo no tiene imagen de portada cargada.
            </p>
          )}

          <div className="admin-post-form-field">
            <label className="admin-post-form-label">
              {mode === "create"
                ? "Imagen de portada"
                : "Cambiar / agregar imagen de portada"}
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              className="admin-post-form-file-input"
            />

            {mode === "edit" && (
              <p className="admin-post-form-help">
                Si seleccionás una imagen nueva y guardás, reemplazará la imagen
                actual.
              </p>
            )}
          </div>

          {previewUrl && (
            <div className="admin-post-form-field">
              <label className="admin-post-form-label">
                Vista previa de la nueva imagen
              </label>

              <img
                src={previewUrl}
                alt="Vista previa de la nueva imagen"
                className="admin-post-form-image"
              />
            </div>
          )}

          <label className="admin-post-form-checkbox">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Publicado
          </label>

          {error && <p className="admin-post-form-error">{error}</p>}

          <div className="admin-post-form-actions">
            <button
              type="submit"
              disabled={saving || deletingImage}
              className="admin-post-form-button admin-post-form-button--primary"
            >
              {saving
                ? "Guardando..."
                : mode === "create"
                ? "Crear artículo"
                : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
              disabled={saving || deletingImage}
              className="admin-post-form-button admin-post-form-button--secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}