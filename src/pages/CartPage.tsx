import { ShoppingCart } from 'lucide-react';

const cartItems = [
  { name: 'Organic Moringa Capsules', quantity: 1, price: '₱420.00' },
  { name: 'Calming Herbal Tea Blend', quantity: 2, price: '₱560.00' },
];

const CartPage = () => {
  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-emerald-950 dark:text-emerald-300">
            <ShoppingCart size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Shopping Cart</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Sample cart page for logged-in customers</p>
          </div>
        </div>

        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 dark:divide-slate-800 dark:border-slate-800">
          {cartItems.map((item) => (
            <div key={item.name} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-slate-100">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold text-green-700 dark:text-emerald-300">{item.price}</p>
            </div>
          ))}
        </div>

        <button className="mt-6 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
