const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">Welcome to Classique Herbs</h1>
        <p className="text-gray-600 text-lg leading-8">
          Select a category from the sidebar to browse your next herbal wellness product.
          The application is now set up with route-based pages for each sidebar section.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-green-50 p-6">
            <h2 className="text-xl font-semibold text-green-700">Scalable design</h2>
            <p className="text-gray-600 mt-2">
              New categories can be added from a single configuration file, and the app will automatically render matching pages.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-6">
            <h2 className="text-xl font-semibold text-blue-700">Routing ready</h2>
            <p className="text-gray-600 mt-2">
              Each sidebar item links to its own page using React Router, so navigation is stable and future-proof.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
