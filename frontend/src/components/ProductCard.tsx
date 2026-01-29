import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Format price to BRL
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      // TODO: Call API to delete product and refresh list
      // For now we just log
      console.log('Delete product', product.id);
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:4000/api/products/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        window.location.reload(); // Simple reload for now
      } catch (error) {
        console.error('Failed to delete', error);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">{formattedPrice}</p>
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <button 
            className="card-button" 
            onClick={() => addToCart(product)}
          >
            Adicionar ao Carrinho
          </button>
          
          {user?.role === 'admin' && (
            <button 
              onClick={handleDelete}
              className="card-button"
              style={{ 
                background: 'rgba(255, 68, 68, 0.1)', 
                color: '#ff4444', 
                border: '1px solid #ff4444',
                marginTop: '8px'
              }}
            >
              Excluir (Admin)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
