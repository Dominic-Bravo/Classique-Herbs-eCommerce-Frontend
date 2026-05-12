import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { setAuthSession } from '../utils/auth';
import type { UserRole } from '../utils/auth';
import { registerUser, ROLE_OPTIONS } from '../api/authApi';
import GoogleAuthForm from '../components/GoogleAuthForm';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password1 !== password2) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await registerUser({
        username,
        email,
        password1,
        password2,
        role,
      });

      setAuthSession(session);
      navigate('/account', { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-emerald-950 dark:text-emerald-300">
            <UserPlus size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Signup</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Create your Classique Herb account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={password1}
              onChange={(event) => setPassword1(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Confirm password</span>
            <input
              type="password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-green-700 hover:text-green-800 dark:text-emerald-300 dark:hover:text-emerald-200">
            Login
          </Link>
        </p>

        <div className="mt-6">
          <GoogleAuthForm returnTo="/account" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
