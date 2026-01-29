import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AdminSidebar from './AdminSidebar';

export default function Header() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount, total } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleAccountClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <AdminSidebar isOpen={isAdminSidebarOpen} onClose={() => setIsAdminSidebarOpen(false)} />
      <div className="container header-top">
        <div className="header-row">
          <div className="header-left">
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>

            {user?.role === 'admin' && (
              <button 
                className="icon-button admin-toggle"
                onClick={() => setIsAdminSidebarOpen(true)}
                aria-label="Admin Menu"
                style={{ border: 'none', background: 'transparent', padding: 0, width: 'auto', height: 'auto', marginRight: '10px' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            )}

            <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
              <img
                ref={imgRef}
                className="logo-img"
                src="/logo.png"
                alt="V7 Store"
              />
              <span className="brand-text">V7 STORE</span>
            </Link>
          </div>
          
          <form className="search" onSubmit={handleSearch}>
            <input 
              className="search-input" 
              placeholder="Pesquisar Produtos" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.3-4.3M16 10a6 6 0 11-12 0 6 6 0 0112 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
          <div className="header-right">
            {user && <span className="user-greeting">Olá, {user.name}</span>}
            <button className="icon-button" aria-label="Conta" onClick={handleAccountClick}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="cart">
              <Link to="/cart" className="icon-button" aria-label="Carrinho">
                <span className="cart-badge">{itemCount}</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6h15l-2 8H7L6 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
                  <circle cx="18" cy="20" r="1.6" fill="currentColor"/>
                </svg>
              </Link>
              <span className="cart-price">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
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
