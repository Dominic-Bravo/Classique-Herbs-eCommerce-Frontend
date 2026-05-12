import React from 'react';
import { 
  Leaf, Mail, Phone, MapPin, 
  Heart, Share2, Link2 
} from 'lucide-react';


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white mt-auto transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 p-1.5 rounded-lg">
                <Leaf size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                Classique Herb
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-6 dark:text-slate-400">
              Bringing nature's wellness to your daily life with carefully curated herbal products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-900 mb-4 dark:text-slate-100">
              Products
            </h3>
            <nav className="space-y-3">
              {['Teas', 'Capsules', 'Powders', 'Oils'].map((item) => (
                <a
                  key={item}
                  href={`/category/${item.toLowerCase()}`}
                  className="block text-sm text-slate-600 hover:text-green-700 transition dark:text-slate-400 dark:hover:text-emerald-300"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-900 mb-4 dark:text-slate-100">
              Support
            </h3>
            <nav className="space-y-3">
              {['Contact Us', 'FAQ', 'Returns', 'Shipping Info'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-sm text-slate-600 hover:text-green-700 transition dark:text-slate-400 dark:hover:text-emerald-300"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-900 mb-4 dark:text-slate-100">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Phone size={16} className="text-green-600" />
                <a href="tel:+1234567890" className="hover:text-green-700 transition">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail size={16} className="text-green-600" />
                <a href="mailto:hello@classique.com" className="hover:text-green-700 transition">
                  hello@classique.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin size={16} className="text-green-600" />
                <span>123 Herbal St, Wellness City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200 dark:border-slate-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {currentYear} Classique Herb. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-600 hover:border-green-600 hover:text-green-600 transition dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              aria-label="Share"
            >
              <Share2 size={16} />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-600 hover:border-green-600 hover:text-green-600 transition dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              aria-label="Connect"
            >
              <Link2 size={16} />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-600 hover:border-green-600 hover:text-green-600 transition dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              aria-label="Favorite"
            >
              <Heart size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
