"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/campus";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Calcular fortaleza de la contraseña
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "", width: "0%" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { label: "Muy débil", color: "bg-red-400", width: "20%" },
      { label: "Débil", color: "bg-orange-400", width: "40%" },
      { label: "Regular", color: "bg-amber-400", width: "60%" },
      { label: "Buena", color: "bg-emerald-400", width: "80%" },
      { label: "Excelente", color: "bg-emerald-500", width: "100%" },
    ];
    return levels[Math.min(score, 4)];
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1. Iniciando registro...");
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Validaciones
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }
    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones");
      setIsLoading(false);
      return;
    }

    console.log("2. Validaciones pasadas. Registrando en Supabase...");

    // Registrar en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) {
      console.error("3. Error de Supabase Auth:", authError);
      // Si el usuario ya existe, intentar iniciar sesión directamente
      if (authError.message?.includes("already registered") || authError.status === 422) {
        console.log("El usuario ya existe, intentando iniciar sesión...");
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (signInResult?.error) {
          setError("Este correo ya está registrado. Intenta iniciar sesión.");
        } else {
          window.location.href = callbackUrl;
        }
        setIsLoading(false);
        return;
      }
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    console.log("4. Usuario creado en Auth:", authData.user);

    if (authData.user) {
      // Insertar en public.users
      const { error: profileError } = await supabase
        .from("users")
        .insert({
          id: authData.user.id,
          email,
          name,
          role: "miembro",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error("5. Error creando perfil:", JSON.stringify(profileError));
        // No detenemos el flujo; el usuario ya existe en Auth
      } else {
        console.log("6. Perfil creado en public.users");
      }

      // Iniciar sesión automáticamente
      console.log("7. Iniciando sesión automática...");
      setSuccessMessage("¡Cuenta creada! Redirigiendo...");

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        console.error("8. Error al iniciar sesión:", signInResult.error);
        setError(
          "Cuenta creada pero no se pudo iniciar sesión. Intenta iniciar sesión manualmente."
        );
        setIsLoading(false);
        return;
      }

      console.log("9. Redirigiendo al campus...");
      window.location.href = callbackUrl;
    }

    setIsLoading(false);
  };

  return (
    <PublicLayout>
      <section className="relative min-h-[80vh] flex items-center justify-center py-16 lg:py-20 overflow-hidden">
        {/* Fondos decorativos */}
        <div className="absolute inset-0 bg-[#fafbfc]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00498d]/[0.02] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00498d]/[0.02] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        {/* Textura sutil */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-soft-light pointer-events-none" />

        <div className="relative w-full max-w-md mx-4">
          {/* Tarjeta principal */}
          <div className="bg-white border border-gray-100/80 rounded-2xl p-8 shadow-sm shadow-gray-200/30">
            {/* Logo */}
            <div className="flex justify-center mb-7">
              <div className="w-12 h-12 bg-[#00498d] rounded-xl flex items-center justify-center shadow-sm shadow-[#00498d]/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M10 5h4v4h4v4h-4v4h-4v-4H6v-4h4z" />
                </svg>
              </div>
            </div>

            {/* Encabezado */}
            <div className="text-center mb-8">
              <h1 className="text-[1.5rem] font-bold text-gray-900 tracking-tight">
                Crear cuenta
              </h1>
              <p className="text-[13px] text-gray-500/70 mt-2 font-normal leading-relaxed">
                Únete a IDC Huancayo y comienza tu formación espiritual
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mensaje de error */}
              {error && (
                <div className="flex items-center gap-2.5 bg-red-50/80 border border-red-100/80 text-red-600 text-[13px] p-3.5 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Mensaje de éxito */}
              {successMessage && (
                <div className="flex items-center gap-2.5 bg-emerald-50/80 border border-emerald-100/80 text-emerald-600 text-[13px] p-3.5 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
                  <svg
                    className="w-4 h-4 flex-shrink-0 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Campo: Nombre completo */}
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                  Nombre completo
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-xl text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#00498d]/40 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Campo: Email */}
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-xl text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#00498d]/40 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Campo: Contraseña */}
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-200/80 rounded-xl text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#00498d]/40 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243a9.97 9.97 0 01-2.901 1.636M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Indicador de fortaleza */}
                {password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Fortaleza:{" "}
                      <span className="text-gray-600">{passwordStrength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Campo: Confirmar contraseña */}
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-xl text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 bg-white ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : confirmPassword && password === confirmPassword
                        ? "border-emerald-300 focus:border-emerald-400 focus:ring-emerald-100"
                        : "border-gray-200/80 focus:border-[#00498d]/40 focus:ring-[#00498d]/[0.08]"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243a9.97 9.97 0 01-2.901 1.636M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Indicador de coincidencia */}
                {confirmPassword && password === confirmPassword && (
                  <p className="text-[10px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Las contraseñas coinciden
                  </p>
                )}
              </div>

              {/* Checkbox de términos */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#00498d] focus:ring-[#00498d]/20 transition-colors cursor-pointer"
                />
                <span className="text-[12px] text-gray-500 group-hover:text-gray-700 transition-colors leading-relaxed">
                  Acepto los{" "}
                  <Link
                    href="/terminos"
                    className="text-[#00498d] hover:underline font-medium"
                    tabIndex={-1}
                  >
                    Términos de uso
                  </Link>{" "}
                  y la{" "}
                  <Link
                    href="/privacidad"
                    className="text-[#00498d] hover:underline font-medium"
                    tabIndex={-1}
                  >
                    Política de privacidad
                  </Link>
                </span>
              </label>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00498d] text-white py-2.5 rounded-xl font-medium text-[14px] hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    Crear cuenta gratuita
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Separador */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[11px]">
                <span className="px-3 bg-white text-gray-400 font-medium uppercase tracking-wider">
                  o regístrate con
                </span>
              </div>
            </div>

            {/* Botones sociales */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => signIn("google", { callbackUrl })}
                className="flex items-center justify-center gap-2.5 py-2.5 border border-gray-200/80 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-50/80 hover:border-gray-300 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                onClick={() => signIn("facebook", { callbackUrl })}
                className="flex items-center justify-center gap-2.5 py-2.5 border border-gray-200/80 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-50/80 hover:border-gray-300 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Link de inicio de sesión */}
            <p className="mt-6 text-center text-[13px] text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="text-[#00498d] font-medium hover:text-[#003d7a] transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* Texto legal */}
          <p className="text-center text-[11px] text-gray-400 mt-6 px-4 leading-relaxed">
            Al registrarte, aceptas nuestros{" "}
            <Link
              href="/terminos"
              className="underline hover:text-gray-500 transition-colors"
            >
              Términos de uso
            </Link>{" "}
            y{" "}
            <Link
              href="/privacidad"
              className="underline hover:text-gray-500 transition-colors"
            >
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}