import { Bell } from 'lucide-react';

const notifications = [
  'Your herbal tea sampler is ready for checkout.',
  'Fresh immunity blends were added today.',
  'Your last order earned wellness points.',
];

const NotificationsPage = () => {
  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <Bell size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500">Sample customer messages</p>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-800">{notification}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
