import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SIDEBAR_ITEMS } from '../data/sidebarItems';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const category = useMemo(
    () => SIDEBAR_ITEMS.find((item) => item.path === slug),
    [slug],
  );

  const products = useMemo(
    () => PRODUCTS.filter((product) => product.category === slug),
    [slug],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      const text = `${product.name} ${product.description} ${product.features.join(' ')} ${product.tags?.join(' ') ?? ''}`.toLowerCase();
      return text.includes(normalizedQuery);
    });
  }, [products, searchQuery]);

  if (!category) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
  <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-green-50 shadow-sm transition-all duration-500">
    
    {/* Header Section */}
    <div className="bg-white/60 backdrop-blur-md px-8 py-10 sm:px-12 border-b border-gray-100">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full">
              Category
            </span>
            {/* Displaying Icon separately for a cleaner look */}
            <span className="text-xl">{category.icon}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl tracking-tight">
            {category.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {category.description}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0">
          <div className="rounded-3xl bg-white border border-slate-200 p-4 shadow-sm flex items-center gap-4">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">In Stock</p>
              <p className="text-xl font-bold text-slate-900">
                {filteredProducts.length} <span className="text-sm font-normal text-slate-400">Items</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Refined */}
      <div className="mt-10 relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search within ${category.name}...`}
          className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 
                     text-slate-900 shadow-sm outline-none transition-all
                     focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                     placeholder:text-gray-400"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>

    {/* Products Grid */}
    <div className="px-8 py-10 sm:px-12 bg-white/40">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 text-center">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Search className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No matches found</h3>
            <p className="mt-2 text-slate-500 max-w-xs mx-auto">
              We couldn't find any products matching "{searchQuery}". 
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-sm font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
            >
              Show all products
            </button>
          </div>
        )}
      </div>
    </div>

  </div>
</div>
  );
};

export default CategoryPage;
