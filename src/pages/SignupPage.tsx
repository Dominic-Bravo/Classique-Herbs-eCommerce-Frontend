import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { setAuthSession } from '../utils/auth';
import type { UserRole } from '../utils/auth';

const REGISTRATION_URL = 'http://127.0.0.1:8000/api/auth/registration/';

const ROLE_OPTIONS: Array<{ value: UserRole; label: string }> = [
  { value: 'customer', label: 'Customer' },
  { value: 'owner', label: 'Owner' },
  { value: 'anonymous', label: 'Anonymous' },
];

type RegistrationResponse = {
  access?: string;
  refresh?: string;
  user?: {
    pk?: number;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: UserRole;
  };
  detail?: string;
};

const getErrorMessage = (errorData: unknown) => {
  if (!errorData || typeof errorData !== 'object') {
    return 'Registration failed. Please check your details and try again.';
  }

  return Object.entries(errorData)
    .map(([field, value]) => {
      if (Array.isArray(value)) {
        return `${field}: ${value.join(' ')}`;
      }

      return `${field}: ${String(value)}`;
    })
    .join(' ');
};

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
      const response = await fetch(REGISTRATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password1,
          password2,
          role,
        }),
      });

      const data = (await response.json().catch(() => null)) as RegistrationResponse | null;

      if (!response.ok) {
        setError(getErrorMessage(data));
        return;
      }

      const token = data?.access;

      if (token) {
        const fullName = [data?.user?.first_name, data?.user?.last_name].filter(Boolean).join(' ');

        setAuthSession({
          token,
          refreshToken: data?.refresh,
          user: {
            id: data?.user?.pk,
            name: fullName || data?.user?.username || username,
            email: data?.user?.email ?? email,
            role: data?.user?.role ?? role,
          },
        });

        navigate('/account', { replace: true });
        return;
      }

      navigate('/login', {
        replace: true,
        state: { message: data?.detail ?? 'Registration successful. You can now log in.' },
      });
    } catch {
      setError('Could not connect to the registration API. Make sure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <UserPlus size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Signup</h1>
            <p className="text-sm text-gray-500">Create your Classique Herb account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              required
            />
          </label>

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
              value={password1}
              onChange={(event) => setPassword1(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Confirm password</span>
            <input
              type="password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
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
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
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

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-green-700 hover:text-green-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
