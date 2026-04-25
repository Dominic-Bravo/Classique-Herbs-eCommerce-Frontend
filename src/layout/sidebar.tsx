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
      className={`relative flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-10"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
      </button>

      <div className="p-6 mb-4">
        <h1 className={`font-bold text-xl text-green-700 truncate ${!isOpen ? 'opacity-0' : ''}`}>
          Classique Herbs
        </h1>
      </div>

      <div className="px-4 mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={isOpen ? 'Search...' : ''}
            className={`w-full pl-10 pr-2 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
              !isOpen ? 'cursor-default focus:ring-0 px-0 justify-center' : ''
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!isOpen}
          />
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {filteredCategories.map((category) => (
          <NavLink
            key={category.id}
            to={`/category/${category.path}`}
            className={({ isActive }) =>
              `group relative flex items-center p-3 rounded-xl transition-colors ${
                isActive ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
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
              <div className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-20">
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
