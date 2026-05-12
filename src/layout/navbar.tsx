import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Bell, Leaf, LogIn, Moon, Sun } from 'lucide-react';
import { getAuthSession, getInitials, type AuthSession } from '../utils/auth';
import { applyTheme, getPreferredTheme, storeTheme, type Theme } from '../utils/theme';

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [session, setSession] = useState<AuthSession | null>(() => getAuthSession());
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

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
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  const handleThemeToggle = () => {
    const selectedTheme = nextTheme;
    
    // 1. Save the choice
    storeTheme(selectedTheme);
    
    // 2. Update the HTML class instantly
    applyTheme(selectedTheme);
    
    // 3. Update React state to change the icon
    setTheme(selectedTheme);
  };

  return (
    <nav className="sticky top-0 z-[60] flex h-16 items-center justify-between border-b border-gray-200 bg-white px-3 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:px-6">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-green-600 p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
            <Leaf size={20} className="text-white" />
          </div>
          <span className="hidden text-xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent sm:block">
            Classique Herb
          </span>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        {/* Space for future feature */}
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <Link
          to={isLoggedIn ? '/notifications' : '/login'}
          aria-label={isLoggedIn ? 'Open notifications' : 'Log in to view notifications'}
          className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Bell size={20} />
          {isLoggedIn && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-950"></span>
          )}
        </Link>

        <Link
          to={isLoggedIn ? '/cart' : '/login'}
          aria-label={isLoggedIn ? 'Open shopping cart' : 'Log in to view shopping cart'}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ShoppingCart size={20} />
        </Link>

        <button
          type="button"
          onClick={handleThemeToggle}
          aria-label={`Switch to ${nextTheme} mode`}
          title={`Switch to ${nextTheme} mode`}
          className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block dark:bg-slate-800"></div>

        <Link
          to={isLoggedIn ? '/account' : '/login'}
          className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-slate-800"
          aria-label={isLoggedIn ? 'Open account' : 'Log in to your account'}
        >
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs border border-green-200 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {isLoggedIn ? getInitials(userName) : <LogIn size={16} />}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden lg:block pr-2 dark:text-slate-200">
            {isLoggedIn ? userName : 'Login'}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;