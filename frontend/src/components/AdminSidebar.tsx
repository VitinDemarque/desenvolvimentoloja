import { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Adicionar Produto', path: '/admin/add-product', icon: '＋' },
  ];

  return (
    <>
      <div 
        className={`admin-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      <aside 
        ref={sidebarRef} 
        className={`admin-drawer ${isOpen ? 'open' : ''}`}
      >
        <div className="drawer-header">
          <div className="drawer-title-row">
            <h2 className="drawer-title">V7 Admin</h2>
            <button className="drawer-close" onClick={onClose}>
              ✕
            </button>
          </div>
          {user && (
            <div className="drawer-user">
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">Administrador</span>
              </div>
            </div>
          )}
        </div>

        <nav className="drawer-nav">
          {menuItems.map((item) => (
            <button 
              key={item.path}
              className={`drawer-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <span className="item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="drawer-footer">
          <button className="drawer-item logout" onClick={handleLogout}>
            <span className="item-icon">🚪</span>
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}