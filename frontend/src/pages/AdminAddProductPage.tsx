import { useNavigate } from 'react-router-dom';
import AdminProductForm from '../components/AdminProductForm';

export default function AdminAddProductPage() {
  const navigate = useNavigate();

  return (
    <main className="container">
      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--muted)', 
            cursor: 'pointer', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Voltar para Loja
        </button>
        
        <h1 className="section-title" style={{ marginTop: 0 }}>Adicionar Novo Produto</h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <AdminProductForm />
        </div>
      </div>
    </main>
  );
}
