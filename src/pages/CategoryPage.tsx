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
    <div className="max-w-6xl mx-auto py-8">
      <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-green-50 shadow-sm">
        <div className="bg-white px-8 py-10 sm:px-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-700 font-semibold">Category</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">{category.name}</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">{category.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm">
              {category.icon}
              {category.name}
            </span>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr] lg:items-center">
            <div className="rounded-3xl bg-slate-900/5 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Products available</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-3xl font-bold text-slate-900">{filteredProducts.length}</span>
                <span className="text-sm text-slate-500">of {products.length} total</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <Search className="text-gray-400" size={18} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-slate-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="px-8 py-8 sm:px-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
                <p className="text-lg font-semibold text-slate-900">No products match your search</p>
                <p className="mt-3 text-sm">Try a different keyword or clear the search field to explore all items.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
