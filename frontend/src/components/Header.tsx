import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { TransitionLink } from './TransitionLink';

export default function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="container header-top">
        <div className="header-row">
          {/* Logo & Mobile Menu */}
          <div className="header-left">
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <TransitionLink to="/" className="brand">
              <img src="/logo-v7.png" alt="V7 Store" className="logo-img" />
              <span className="brand-text">V7 Store</span>
            </TransitionLink>
          </div>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="search desktop-search">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <Search size={20} color="#0b0f14" />
            </button>
          </form>

          {/* Icons */}
          <div className="header-right">
            <TransitionLink to="/cart" className="icon-button cart">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </TransitionLink>
            
            {user ? (
              <TransitionLink to="/profile" className="icon-button">
                <User size={20} />
              </TransitionLink>
            ) : (
              <TransitionLink to="/login" className="icon-button">
                <User size={20} />
              </TransitionLink>
            )}
          </div>
        </div>
      </div>
      <div className={`nav-bar ${isMenuOpen ? 'open' : ''}`}>
        <div className="container nav-content">
          <a className="nav-item">BRASILEIRÃO <span className="caret">▾</span></a>
          <a className="nav-item">TIMES INTERNACIONAIS <span className="caret">▾</span></a>
          <a className="nav-item">SELEÇÕES <span className="caret">▾</span></a>
          <a className="nav-item">FEMININA</a>
          <a className="nav-item">KIDS</a>
          <a className="nav-item">CONJUNTOS <span className="caret">▾</span></a>
          <a className="nav-item">RETRÔ</a>
          <a className="nav-item">PLAYER <span className="caret">▾</span></a>
          <a className="nav-item">MEIAS</a>
          <a className="nav-item">ACESSÓRIOS</a>
        </div>
      </div>
    </header>
  );
}
