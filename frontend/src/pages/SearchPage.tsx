import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // In a real app, we would pass ?q=query to the backend
        // For now, we fetch all and filter client-side
        const res = await fetch('http://localhost:4000/api/products', { cache: 'no-store' });
        if (!res.ok) {
          setProducts([]);
        } else {
          const data: Product[] = await res.json();
          const normalize = (str: string) => 
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

          const filtered = data.filter(p => 
            normalize(p.name).includes(normalize(query))
          );
          setProducts(filtered);
        }
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [query]);

  return (
    <div className="container" style={{ marginTop: '120px' }}>
      <h2 className="section-title">
        Resultados para "{query}"
      </h2>

      {loading ? (
        <div className="grid">
          {Array.from({ length: 3 }).map((_, i) => (
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
          <p>Nenhum produto encontrado.</p>
        </div>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
