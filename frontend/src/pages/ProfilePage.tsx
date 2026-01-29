import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container" style={{ marginTop: '120px' }}>
      <h2 className="section-title">Minha Conta</h2>
      
      <div className="card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'var(--primary)',
            color: '#000',
            display: 'grid',
            placeItems: 'center',
            fontSize: '32px',
            fontWeight: 'bold'
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: '0 0 5px', fontSize: '24px' }}>{user.name}</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{user.email}</p>
            <span style={{ 
              display: 'inline-block', 
              marginTop: '8px', 
              padding: '4px 12px', 
              borderRadius: '99px', 
              background: 'rgba(255,255,255,0.1)', 
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {user.role}
            </span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>Meus Pedidos</h4>
          <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
            Você ainda não realizou nenhum pedido.
          </p>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #ff4444',
              color: '#ff4444',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,68,68,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}
