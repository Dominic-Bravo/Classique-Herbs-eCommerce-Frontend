import { KeyRound } from 'lucide-react';
import { GOOGLE_AUTH_REDIRECT_KEY, GOOGLE_OAUTH_URL } from '../api/authApi';

interface GoogleAuthFormProps {
  returnTo: string;
}

const GoogleAuthForm = ({ returnTo }: GoogleAuthFormProps) => {
  const handleGoogleRedirect = () => {
    window.localStorage.setItem(GOOGLE_AUTH_REDIRECT_KEY, returnTo);
    window.location.assign(GOOGLE_OAUTH_URL);
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700">
          <KeyRound size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Continue with Google</h2>
          <p className="text-xs text-gray-500">Google will return an authorization code</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleRedirect}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
      >
        <KeyRound size={16} />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuthForm;
