export const dynamic = "force-dynamic";

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: string;
  imageUrl?: string | null;
  team?: string | null;
  league?: string | null;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:4000/products", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

import Link from "next/link";
import Image from "next/image";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">Camisas de Futebol</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Catálogo de produtos</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 p-4 shadow-sm hover:shadow-md transition"
            >
              {p.imageUrl ? (
                <div className="relative aspect-square w-full">
                  <Image
                    alt={p.name}
                    src={p.imageUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-lg object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              )}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-black dark:text-zinc-50">{p.name}</h2>
                  <span className="text-black dark:text-zinc-50">R$ {Number(p.price).toFixed(2)}</span>
                </div>
                {(p.team || p.league) && (
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {[p.team, p.league].filter(Boolean).join(" • ")}
                  </p>
                )}
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-black/10 dark:border-white/15 p-8 text-center text-zinc-600 dark:text-zinc-400">
              Nenhum produto cadastrado ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}