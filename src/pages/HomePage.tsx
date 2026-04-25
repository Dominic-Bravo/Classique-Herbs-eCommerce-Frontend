import { Link } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../data/sidebarItems';
import { PRODUCTS } from '../data/products';

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">Welcome to Classique Herbs</h1>
        <p className="text-gray-600 text-lg leading-8">
          Select a category from the sidebar to browse your next herbal wellness product.
          The application is now set up with dynamic pages for each category and product listing.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SIDEBAR_ITEMS.map((item) => {
            const count = PRODUCTS.filter((product) => product.category === item.path).length;

            return (
              <Link
                key={item.id}
                to={`/category/${item.path}`}
                className="group block rounded-3xl border border-gray-200 bg-gray-50 p-6 transition hover:border-green-300 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                    <p className="mt-2 text-sm text-gray-600">{item.headline}</p>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                    {item.icon}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                  <span>{count} products</span>
                  <span className="font-medium text-green-700">Browse</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-green-50 p-6">
            <h2 className="text-xl font-semibold text-green-700">Scalable product model</h2>
            <p className="text-gray-600 mt-2">
              New products and categories can be added easily through the central data files, and the UI updates automatically.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-6">
            <h2 className="text-xl font-semibold text-blue-700">Future ready</h2>
            <p className="text-gray-600 mt-2">
              The category pages now render real products from data, making the app ready for expansion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
