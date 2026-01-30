import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/LoadingContext';
import GlobalLoader from './components/GlobalLoader';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import AdminAddProductPage from './pages/AdminAddProductPage';

export default function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="layout">
              <GlobalLoader />
              <Header />
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/admin/add-product" element={<AdminAddProductPage />} />
            </Routes>
            <footer className="footer">
              <div className="container footer-content">
                <span>© {new Date().getFullYear()} V7 Store</span>
                <span>Feito com ❤️ em TypeScript</span>
              </div>
            </footer>
          </div>
        </Router>
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}
