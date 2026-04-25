import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 text-center">
      <div className="inline-flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="text-gray-600 text-lg">
          The page you are looking for does not exist. Choose a category from the sidebar or return home.
        </p>
        <Link
          to="/"
          className="mx-auto inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
