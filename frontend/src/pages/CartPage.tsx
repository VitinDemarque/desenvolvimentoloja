import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { items, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('Você precisa estar logado para finalizar a compra.');
      navigate('/login');
    } else {
      alert(`Compra finalizada com sucesso! Obrigado, ${user.name}.`);
      clearCart();
      navigate('/');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ marginTop: '120px', textAlign: 'center' }}>
        <h2 className="section-title">Seu carrinho está vazio</h2>
        <button className="hero-cta" onClick={() => navigate('/')}>Voltar para a loja</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '120px' }}>
      <h2 className="section-title">Carrinho de Compras</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {items.map((item) => (
          <div key={item.id} className="card" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '20px',
          }}>
            <div>
              <h3 style={{ margin: 0, color: 'var(--text)' }}>{item.name}</h3>
              <p style={{ color: 'var(--muted)' }}>
                R$ {item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'var(--primary)' }}>
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'rgba(255, 68, 68, 0.1)',
                  color: '#ff4444',
                  border: '1px solid #ff4444',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'right', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '2em', marginBottom: '20px' }}>
          Total: R$ {total.toFixed(2)}
        </h3>
        <button 
          className="hero-cta" 
          style={{ fontSize: '1.2em', padding: '15px 40px' }}
          onClick={handleCheckout}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
