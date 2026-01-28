import { useRef } from 'react';

export default function Header() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  return (
    <header className="header">
      <div className="container header-top">
        <div className="header-row">
          <div className="brand">
            <img
              ref={imgRef}
              className="logo-img"
              src="/logo.png"
              alt="V7 Store"
            />
            <span className="brand-text">V7 STORE</span>
          </div>
          <div className="search">
            <input className="search-input" placeholder="Pesquisar Produtos" />
            <button className="search-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.3-4.3M16 10a6 6 0 11-12 0 6 6 0 0112 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="header-right">
            <button className="icon-button" aria-label="Conta">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="cart">
              <button className="icon-button" aria-label="Carrinho">
                <span className="cart-badge">0</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6h15l-2 8H7L6 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
                  <circle cx="18" cy="20" r="1.6" fill="currentColor"/>
                </svg>
              </button>
              <span className="cart-price">R$ 0,00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-bar">
        <div className="container nav-content">
          <a className="nav-item">BRASILEIRÃO <span className="caret">▾</span></a>
          <a className="nav-item">TIMES INTERNACIONAIS <span className="caret">▾</span></a>
          <a className="nav-item">SELEÇÕES <span className="caret">▾</span></a>
          <a className="nav-item">FEMININA</a>
          <a className="nav-item">KIDS</a>
          <a className="nav-item">NBA <span className="caret">▾</span></a>
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
