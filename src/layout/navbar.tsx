import React from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Bell, 
  Leaf 
} from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-[60] shadow-sm">
      
      {/* Left Side: Logo Only */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="bg-green-600 p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
          <Leaf size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
          Classique Herb
        </span>
      </div>

      {/* Middle: Persistent Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for herbs, teas, or remedies..." 
            className="w-full bg-gray-100 border-transparent border focus:border-green-500 focus:bg-white pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Search Icon */}
        <button className="p-2 md:hidden hover:bg-gray-100 rounded-full text-gray-600">
          <Search size={20} />
        </button>

        <button className="relative p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <Bell size={20} />
          {/* Notification Badge */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ShoppingCart size={20} />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        {/* User Profile */}
        <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs border border-green-200">
            JD
          </div>
          <span className="text-sm font-medium text-gray-700 hidden lg:block pr-2">John Doe</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;