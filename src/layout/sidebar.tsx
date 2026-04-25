import React, { useState } from 'react';
import { 
  Leaf, 
  Pill, 
  Waves, 
  Droplets, 
  Search, 
  Menu, 
  ChevronLeft 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Teas', icon: <Leaf size={20} /> },
  { id: '2', name: 'Capsules', icon: <Pill size={20} /> },
  { id: '3', name: 'Powders', icon: <Waves size={20} /> },
  { id: '4', name: 'Oils', icon: <Droplets size={20} /> },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className={`relative flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out 
      ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Toggle Button - Floating style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-10"
      >
        {isOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
      </button>

      {/* Header / Logo Area */}
      <div className="p-6 mb-4">
        <h1 className={`font-bold text-xl text-green-700 truncate ${!isOpen && 'opacity-0'}`}>
          Classique Herbs
        </h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={isOpen ? "Search..." : ""}
            className={`w-full pl-10 pr-2 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all
            ${!isOpen && 'cursor-default focus:ring-0 px-0 justify-center'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!isOpen}
          />
        </div>
      </div>

      {/* Categories List */}
      <nav className="flex-1 px-3 space-y-2">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            className="w-full flex items-center p-3 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors group"
          >
            <div className="min-w-[24px]">
              {category.icon}
            </div>
            <span 
              className={`ml-4 font-medium transition-opacity duration-200 
              ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
            >
              {category.name}
            </span>
            
            {/* Tooltip for collapsed view */}
            {!isOpen && (
              <div className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-20">
                {category.name}
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;