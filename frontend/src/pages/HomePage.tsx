import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import AdminProductForm from '../components/AdminProductForm';

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:4000/api/products', { cache: 'no-store' });
        if (!res.ok) {
          setProducts([]);
        } else {
          const data = await res.json();
          setProducts(data);
        }
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Camisas oficiais e exclusivas</h1>
          <p className="hero-subtitle">Qualidade premium, entrega rápida e segurança.</p>
          <button className="hero-cta">Ver lançamentos</button>
        </div>
      </section>
      <main className="container">
        <h2 className="section-title">Destaques</h2>
        
        {loading ? (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card skeleton">
                <div className="card-image" />
                <div className="card-body">
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="empty">
            <p>Nenhum produto disponível.</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
