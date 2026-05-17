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
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation() as any;
  const { login } = useAuthContext();
  const [apiError, setApiError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || "/admin";
  const sessionExpired =
    new URLSearchParams(location.search).get("expired") === "true";

  const onSubmit = async (data: LoginData) => {
    setApiError(null);

    try {
      const res = await loginRequest(data);
      login(res.token, res.user);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setApiError("Credenciales inválidas o error de servidor.");
    }
  };

  return (
    <>
      <style>
        {`
          .login-page {
            min-height: calc(100vh - 80px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2.5rem 1rem;
            background:
              linear-gradient(
                135deg,
                rgba(12, 74, 110, 0.08),
                rgba(37, 96, 143, 0.12)
              );
          }

          .login-container {
            width: 100%;
            max-width: 430px;
          }

          .login-header {
            text-align: center;
            margin-bottom: 1.4rem;
          }

          .login-title {
            font-size: clamp(1.7rem, 5vw, 2.1rem);
            font-weight: 800;
            margin: 0 0 0.45rem;
            color: #0f172a;
            line-height: 1.15;
          }

          .login-subtitle {
            margin: 0;
            color: #64748b;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .login-form {
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
            padding: 1.35rem;
            display: flex;
            flex-direction: column;
            gap: 0.95rem;
            border: 1px solid #e2e8f0;
          }

          .login-field {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }

          .login-label {
            display: block;
            font-size: 0.9rem;
            font-weight: 700;
            color: #334155;
          }

          .login-input {
            width: 100%;
            border-radius: 0.65rem;
            border: 1px solid #cbd5e1;
            font-size: 0.95rem;
            padding: 0.65rem 0.8rem;
            outline: none;
            background-color: #ffffff;
          }

          .login-input:focus {
            border-color: #25608f;
            box-shadow: 0 0 0 3px rgba(37, 96, 143, 0.12);
          }

          .login-error {
            color: crimson;
            font-size: 0.82rem;
            margin: 0.1rem 0 0;
            line-height: 1.4;
          }

          .login-session-message {
            background-color: #fef3c7;
            color: #92400e;
            border: 1px solid #f59e0b;
            border-radius: 0.65rem;
            padding: 0.75rem;
            font-size: 0.88rem;
            line-height: 1.5;
            margin: 0;
          }

          .login-api-error {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
            border-radius: 0.65rem;
            padding: 0.75rem;
            font-size: 0.88rem;
            line-height: 1.5;
            margin: 0;
          }

          .login-button {
            margin-top: 0.35rem;
            width: 100%;
            background-color: #0369a1;
            color: white;
            border: none;
            border-radius: 9999px;
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
            box-shadow: 0 10px 20px rgba(3, 105, 161, 0.22);
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 14px 26px rgba(3, 105, 161, 0.28);
          }

          .login-button:disabled {
            cursor: not-allowed;
            opacity: 0.7;
          }

          @media (max-width: 600px) {
            .login-page {
              min-height: calc(100vh - 70px);
              padding: 2rem 0.85rem;
              align-items: flex-start;
            }

            .login-container {
              max-width: 100%;
            }

            .login-header {
              margin-bottom: 1.1rem;
            }

            .login-form {
              padding: 1.1rem;
              border-radius: 0.9rem;
            }

            .login-input {
              font-size: 1rem;
              padding: 0.7rem 0.8rem;
            }

            .login-button {
              padding: 0.8rem 1rem;
              font-size: 1rem;
            }
          }

          @media (max-width: 380px) {
            .login-page {
              padding: 1.5rem 0.75rem;
            }

            .login-form {
              padding: 1rem;
            }
          }
        `}
      </style>

      <section className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1 className="login-title">Login administrador</h1>
            <p className="login-subtitle">
              Acceso reservado para la administración del sitio.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="login-field">
              <label className="login-label">Email</label>

              <input
                type="email"
                autoComplete="email"
                className="login-input"
                {...register("email", {
                  required: "El email es obligatorio",
                })}
              />

              {errors.email && (
                <p className="login-error">{String(errors.email.message)}</p>
              )}
            </div>

            <div className="login-field">
              <label className="login-label">Contraseña</label>

              <input
                type="password"
                autoComplete="current-password"
                className="login-input"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />

              {errors.password && (
                <p className="login-error">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            {sessionExpired && (
              <p className="login-session-message">
                Tu sesión expiró. Iniciá sesión nuevamente para continuar.
              </p>
            )}

            {apiError && <p className="login-api-error">{apiError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="login-button"
            >
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
