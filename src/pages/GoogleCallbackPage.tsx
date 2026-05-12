import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { authenticateWithGoogle, GOOGLE_AUTH_REDIRECT_KEY } from '../api/authApi';
import { setAuthSession } from '../utils/auth';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const googleError = searchParams.get('error');

    if (googleError) {
      setError(`Google authentication failed: ${googleError}`);
      return;
    }

    if (!code) {
      setError('Google did not return an authorization code.');
      return;
    }

    const completeGoogleAuth = async () => {
      try {
        const session = await authenticateWithGoogle({ code });
        const returnTo = window.localStorage.getItem(GOOGLE_AUTH_REDIRECT_KEY) ?? '/account';

        setAuthSession(session);
        window.localStorage.removeItem(GOOGLE_AUTH_REDIRECT_KEY);
        navigate(returnTo, { replace: true });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Google authentication failed.');
      }
    };

    void completeGoogleAuth();
  }, [navigate, searchParams]);

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-emerald-950 dark:text-emerald-300">
          <KeyRound size={22} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
          {error ? 'Google login failed' : 'Finishing Google login'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-slate-400">
          {error || 'Please wait while we connect your Google account.'}
        </p>

        {error && (
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Return to login
          </Link>
        )}
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
