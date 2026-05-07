import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { setAuthSession } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('customer@classique.test');
  const [password, setPassword] = useState('password');

  const routeState = location.state as { from?: string; message?: string } | null;
  const from = routeState?.from ?? '/account';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAuthSession({
      token: 'sample-local-token',
      user: {
        id: 'sample-user',
        name: email.split('@')[0] || 'Classique Customer',
        email,
      },
    });

    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <LogIn size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            <p className="text-sm text-gray-500">Sample local storage auth flow</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {routeState?.message && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {routeState.message}
            </div>
          )}

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              required
            />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          No account yet?{' '}
          <Link to="/signup" className="font-semibold text-green-700 hover:text-green-800">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
