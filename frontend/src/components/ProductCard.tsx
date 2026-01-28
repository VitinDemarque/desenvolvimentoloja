type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="card">
      <div className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">R$ {product.price.toFixed(2)}</p>
        <button className="card-button">Comprar</button>
      </div>
    </div>
  );
}
