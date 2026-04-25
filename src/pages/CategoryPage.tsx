import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../data/sidebarItems';

const CategoryPage = () => {
  const { slug } = useParams();

  const category = useMemo(
    () => SIDEBAR_ITEMS.find((item) => item.path === slug),
    [slug],
  );

  if (!category) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-green-700 font-semibold">Category</p>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">{category.name}</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            {category.icon}
            {category.name}
          </span>
        </div>

        <p className="mt-6 text-gray-600 text-lg leading-8">{category.description}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {['Featured items', 'Best sellers', 'Seasonal picks'].map((section) => (
            <div key={section} className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">{section}</h2>
              <p className="mt-3 text-gray-600">
                Discover curated {category.name.toLowerCase()} selections designed to support your daily wellness routine.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
