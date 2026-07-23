import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ErrorMessage from '../../ui/ErrorMessage';

export default function AuthView() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login, register, resetPassword } = useAuth();
  const navigate = useNavigate();
  const isLoginView = view === 'login';
  const isRegisterView = view === 'register';
  const isForgotView = view === 'forgot';
  const isForgotSuccessView = view === 'forgot-success';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      if (isLoginView) {
        await login(email, password);
        navigate('/');
      } else {
        await register(email, password);
        setInfoMessage('Revisa tu correo electrónico para confirmar tu cuenta.');
        setView('login');
      }
    } catch (err) {
      if (err.message === 'Invalid login credentials') {
        setError("Usuario o contraseña inválida. Intente nuevamente.");
      } else {
        setError(err.message || "Ocurrió un error en la autenticación.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    setInfoMessage(null);

    if (!email.trim()) {
      setError('Ingresa tu correo electrónico para recibir el enlace de recuperación.');
      return;
    }

    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/auth`;
      await resetPassword(email, redirectTo);
      setView('forgot-success');
      setInfoMessage('Revisa tu correo electrónico. Te enviamos un enlace para restablecer tu contraseña.');
    } catch (err) {
      setError(err.message || 'No se pudo enviar el correo de recuperación. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4">R</div>
          <h2 className="text-2xl font-bold text-white">
            {isForgotView && 'Recuperar contraseña'}
            {isForgotSuccessView && 'Correo enviado'}
            {isLoginView && 'Iniciar Sesión'}
            {isRegisterView && 'Crear Cuenta'}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {isForgotView && 'Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.'}
            {isForgotSuccessView && 'Revisa tu bandeja de entrada para continuar con la recuperación.'}
            {isLoginView && 'Accede a tu cuenta de RINN PRO'}
            {isRegisterView && 'Únete a la plataforma de alto rendimiento'}
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage mensaje={error} onRetry={() => setError(null)} />
          </div>
        )}

        {infoMessage && !isForgotSuccessView && (
          <div className="mb-6 rounded-lg bg-slate-800 border border-slate-700 p-4 text-sm text-blue-200">
            {infoMessage}
          </div>
        )}

        {isForgotSuccessView ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300">
              Te enviamos un enlace seguro a tu correo para restablecer tu contraseña. Si no aparece en unos minutos, revisa la carpeta de spam.
            </div>
            <button
              type="button"
              onClick={() => {
                setView('login');
                setError(null);
                setInfoMessage(null);
                setPassword('');
              }}
              className="w-full py-3 rounded font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Volver a iniciar sesión
            </button>
          </div>
        ) : isForgotView ? (
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded font-bold transition-colors ${loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
            >
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </button>

            <button
              type="button"
              onClick={() => {
                setView('login');
                setError(null);
                setInfoMessage(null);
              }}
              className="text-sm text-blue-400 hover:text-blue-300 text-left underline"
            >
              Volver al inicio de sesión
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 py-3 rounded font-bold transition-colors ${loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
            >
              {loading ? 'Procesando...' : (isLoginView ? 'Ingresar' : 'Registrarse')}
            </button>

            {isLoginView && (
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 text-left mt-2 underline"
                onClick={() => {
                  setView('forgot');
                  setError(null);
                  setInfoMessage(null);
                }}
                disabled={loading}
              >
                Olvidó su contraseña?
              </button>
            )}
          </form>
        )}

        {!isForgotSuccessView && !isForgotView && (
          <div className="mt-6 text-center border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-400">
              {isLoginView ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              <button
                type="button"
                onClick={() => {
                  setView(isLoginView ? 'register' : 'login');
                  setError(null);
                  setInfoMessage(null);
                  setPassword('');
                }}
                className="ml-2 text-blue-400 hover:text-blue-300 font-bold transition-colors"
              >
                {isLoginView ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}