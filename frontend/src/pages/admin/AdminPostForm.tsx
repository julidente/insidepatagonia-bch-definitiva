import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPost,
  getPostById,
  updatePost,
  uploadPostImage
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
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
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
        is_published: isPublished
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
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
        <p>Cargando artículo...</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        {mode === "create" ? "Nuevo artículo" : "Editar artículo"}
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "14px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          display: "grid",
          gap: "1rem"
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #cbd5e1"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              resize: "vertical"
            }}
          />
        </div>

        {mode === "edit" && currentPost?.cover_image_url && (
          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
              Imagen actual
            </label>
            <img
              src={currentPost.cover_image_url}
              alt={currentPost.title}
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "auto",
                borderRadius: "12px",
                objectFit: "cover"
              }}
            />
          </div>
        )}

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
            {mode === "create" ? "Imagen de portada" : "Nueva imagen de portada"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
          {mode === "edit" && (
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "0.4rem" }}>
              Si seleccionás una imagen nueva, reemplazará la actual.
            </p>
          )}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publicado
        </label>

        {error && (
          <p style={{ color: "#dc2626", margin: 0 }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              backgroundColor: "#0c4a6e",
              color: "white",
              border: "none",
              padding: "0.8rem 1.1rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600
            }}
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
            style={{
              backgroundColor: "#e2e8f0",
              color: "#0f172a",
              border: "none",
              padding: "0.8rem 1.1rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}