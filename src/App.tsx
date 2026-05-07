import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './layout/navbar';
import Sidebar from './layout/sidebar';
import Footer from './layout/footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotificationsPage from './pages/NotificationsPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import GoogleCallbackPage from './pages/GoogleCallbackPage';
import RequireAuth from './components/RequireAuth';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col overflow-hidden">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((prev) => !prev)} />
          <main className="min-h-0 flex-1 overflow-y-auto bg-gray-50 p-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/google-callback" element={<GoogleCallbackPage />} />
              <Route
                path="/notifications"
                element={
                  <RequireAuth>
                    <NotificationsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/cart"
                element={
                  <RequireAuth>
                    <CartPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/account"
                element={
                  <RequireAuth>
                    <AccountPage />
                  </RequireAuth>
                }
              />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
