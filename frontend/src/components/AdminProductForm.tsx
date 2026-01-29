import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { user } = useAuth();

  if (user?.role !== 'admin') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price)
        })
      });

      if (res.ok) {
        alert('Produto criado com sucesso!');
        setName('');
        setPrice('');
        window.location.reload();
      } else {
        alert('Erro ao criar produto');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-form-container">
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: 'var(--primary)' }}>
        Adicionar Produto
      </h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          className="search-input"
          placeholder="Nome do Produto"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ flex: 1, minWidth: '200px' }}
          required
        />
        <input
          className="search-input"
          type="number"
          placeholder="Preço"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ width: '150px' }}
          required
          step="0.01"
        />
        <button type="submit" className="hero-cta" style={{ borderRadius: '12px', width: '100%' }}>
          Adicionar
        </button>
      </form>
    </div>
  );
}
