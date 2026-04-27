
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import type { LoginData } from "../types/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const navigate = useNavigate();
  const location = useLocation() as any;
  const { login } = useAuthContext();
  const [apiError, setApiError] = useState<string | null>(null);
  const from = location.state?.from?.pathname || "/admin";

  const onSubmit = async (data: LoginData) => {
    setApiError(null);
    try {
      const res = await loginRequest(data);
      // res tiene: { token, user: { user_id, name, email } }
      login(res.token, res.user);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setApiError("Credenciales inválidas o error de servidor.");
    }
  };

  return (
    <section
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        padding: "2rem 1rem"
      }}
    >
      <h1 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "1rem" }}>
        Login administrador
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 15px -3px rgba(15,23,42,0.1)",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem"
        }}
      >
        <div>
          <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "El email es obligatorio"
            })}
            style={{
              width: "100%",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              padding: "0.35rem 0.5rem"
            }}
          />
          {errors.email && (
            <p style={{ color: "crimson", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              {String(errors.email.message)}
            </p>
          )}
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Contraseña
          </label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria"
            })}
            style={{
              width: "100%",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              padding: "0.35rem 0.5rem"
            }}
          />
          {errors.password && (
            <p style={{ color: "crimson", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              {String(errors.password.message)}
            </p>
          )}
        </div>

        {apiError && (
          <p style={{ color: "crimson", fontSize: "0.85rem" }}>{apiError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "0.5rem",
            width: "100%",
            backgroundColor: "#0369a1",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            padding: "0.5rem 0.75rem",
            fontSize: "0.9rem",
            cursor: "pointer",
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </section>
  );
};

export default Login;
