import { NavLink } from 'react-router-dom';
import { Search, ChevronLeft, Menu } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SIDEBAR_ITEMS } from '../data/sidebarItems';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(
    () =>
      SIDEBAR_ITEMS.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  return (
    <div
      className={`relative flex h-full min-h-0 shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
      </button>

      <div className="p-6 mb-4">
        <h1 className={`font-bold text-xl text-green-700 truncate dark:text-emerald-400 ${!isOpen ? 'opacity-0' : ''}`}>
          Categories
        </h1>
      </div>

      <div className="px-4 mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400 dark:text-slate-500" size={18} />
          <input
            type="text"
            placeholder={isOpen ? 'Search...' : ''}
            className={`w-full pl-10 pr-2 py-2 bg-gray-100 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${
              !isOpen ? 'cursor-default focus:ring-0 px-0 justify-center' : ''
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!isOpen}
          />
        </div>
      </div>

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-6">
        {filteredCategories.map((category) => (
          <NavLink
            key={category.id}
            to={`/category/${category.path}`}
            className={({ isActive }) =>
              `group relative flex items-center p-3 rounded-xl transition-colors ${
                isActive ? 'bg-green-50 text-green-700 dark:bg-emerald-950/70 dark:text-emerald-300' : 'text-gray-600 hover:bg-green-50 hover:text-green-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-emerald-300'
              }`
            }
          >
            <div className="min-w-[24px]">{category.icon}</div>
            <span
              className={`ml-4 font-medium transition-opacity duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              {category.name}
            </span>
            {!isOpen && (
              <div className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-20 dark:bg-slate-700">
                {category.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
