import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div className={`admin-sidebar-overlay ${isOpen ? 'open' : ''}`} />
      <div ref={sidebarRef} className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-title">Painel Admin</h2>
          <button className="close-sidebar-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="admin-sidebar-content">
          <nav className="admin-nav">
            <button className="admin-nav-item" onClick={() => handleNavigate('/admin/add-product')}>
              <span className="icon">＋</span>
              Adicionar Produto
            </button>
            {/* Future admin links can go here */}
            <button className="admin-nav-item" onClick={() => handleNavigate('/')}>
              <span className="icon">🏠</span>
              Voltar para Loja
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
