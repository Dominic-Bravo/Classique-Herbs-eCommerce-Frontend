import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Bell, Leaf, LogIn } from 'lucide-react';
import { getAuthSession, getInitials, type AuthSession } from '../utils/auth';

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [session, setSession] = useState<AuthSession | null>(() => getAuthSession());

  useEffect(() => {
    const syncSession = () => setSession(getAuthSession());

    window.addEventListener('storage', syncSession);
    window.addEventListener('auth-session-changed', syncSession);

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener('auth-session-changed', syncSession);
    };
  }, []);

  const isLoggedIn = Boolean(session);
  const userName = session?.user.name ?? 'Guest';

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-[60] shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-green-600 p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
            <Leaf size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
            Classique Herb
          </span>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        {/* Space for future feature - quick filters, category selector, or promotional banner */}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          to={isLoggedIn ? '/notifications' : '/login'}
          aria-label={isLoggedIn ? 'Open notifications' : 'Log in to view notifications'}
          className="relative p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
        >
          <Bell size={20} />
          {isLoggedIn && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          )}
        </Link>

        <Link
          to={isLoggedIn ? '/cart' : '/login'}
          aria-label={isLoggedIn ? 'Open shopping cart' : 'Log in to view shopping cart'}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
        >
          <ShoppingCart size={20} />
        </Link>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        <Link
          to={isLoggedIn ? '/account' : '/login'}
          className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isLoggedIn ? 'Open account' : 'Log in to your account'}
        >
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs border border-green-200">
            {isLoggedIn ? getInitials(userName) : <LogIn size={16} />}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden lg:block pr-2">
            {isLoggedIn ? userName : 'Login'}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
