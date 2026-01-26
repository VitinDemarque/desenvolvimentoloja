export const dynamic = "force-dynamic";

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: string;
  imageUrl?: string | null;
  team?: string | null;
  league?: string | null;
  stock?: number;
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

import Link from "next/link";
import Image from "next/image";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <div className="mx-auto max-w-3xl px-6 py-10 text-zinc-600 dark:text-zinc-400">Produto não encontrado.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/products" className="text-sm text-zinc-600 dark:text-zinc-400">← Voltar</Link>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {product.imageUrl ? (
            <div className="relative aspect-square w-full">
              <Image alt={product.name} src={product.imageUrl} fill sizes="(max-width: 768px) 100vw, 50vw" className="rounded-xl object-cover" />
            </div>
          ) : (
            <div className="aspect-square w-full rounded-xl bg-zinc-100 dark:bg-zinc-800" />
          )}
          <div>
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">{product.name}</h1>
            {(product.team || product.league) && (
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                {[product.team, product.league].filter(Boolean).join(" • ")}
              </p>
            )}
            <p className="mt-4 text-xl text-black dark:text-zinc-50">R$ {Number(product.price).toFixed(2)}</p>
            {product.description && (
              <p className="mt-4 text-zinc-700 dark:text-zinc-300">{product.description}</p>
            )}
            <button className="mt-6 w-full rounded-full bg-black px-5 py-3 text-white dark:bg-white dark:text-black">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}