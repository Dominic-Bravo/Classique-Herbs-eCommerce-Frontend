import { useNavigate } from 'react-router-dom';
import { LogOut, UserRound } from 'lucide-react';
import { clearAuthSession, getAuthSession, getInitials } from '../utils/auth';

const AccountPage = () => {
  const navigate = useNavigate();
  const session = getAuthSession();
  const user = session?.user;

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login', { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-lg font-bold text-green-700 dark:bg-emerald-950 dark:text-emerald-300">
            {user ? getInitials(user.name) : <UserRound size={24} />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{user?.name}</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-slate-500">Session</p>
            <p className="mt-2 text-sm font-medium text-gray-800 dark:text-slate-200">Stored in localStorage</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-slate-500">Role</p>
            <p className="mt-2 capitalize text-sm font-medium text-gray-800 dark:text-slate-200">
              {user?.role ?? 'customer'}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-slate-500">Access</p>
            <p className="mt-2 truncate text-sm font-medium text-gray-800 dark:text-slate-200">{session?.token}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-slate-500">Refresh</p>
            <p className="mt-2 truncate text-sm font-medium text-gray-800 dark:text-slate-200">
              {session?.refreshToken ? 'Available' : 'Not stored'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
