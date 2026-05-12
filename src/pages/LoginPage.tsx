import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { setAuthSession } from '../utils/auth';
import { loginUser } from '../api/authApi';
import GoogleAuthForm from '../components/GoogleAuthForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const routeState = location.state as { from?: string; message?: string } | null;
  const from = routeState?.from ?? '/account';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const session = await loginUser({
        username,
        email,
        password,
      });

      setAuthSession(session);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-emerald-950 dark:text-emerald-300">
            <LogIn size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Login</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Access your Classique Herb account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {routeState?.message && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {routeState.message}
            </div>
          )}

          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
          No account yet?{' '}
          <Link to="/signup" className="font-semibold text-green-700 hover:text-green-800 dark:text-emerald-300 dark:hover:text-emerald-200">
            Create one
          </Link>
        </p>

        <div className="mt-6">
          <GoogleAuthForm returnTo={from} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
