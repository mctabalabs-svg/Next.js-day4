import pool from "@/lib/db";
import Link from "next/link";

export default async function ProductsPage() {
  const { rows: products } = await pool.query(
    "SELECT id, slug, name, price_cents, image_url FROM products ORDER BY name"
  );

  return (
    <main>
      <h1>All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`}>
            <div className="border rounded p-4">
              <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover" />
              <h2 className="font-semibold">{p.name}</h2>
              <p>KES {(p.price_cents / 100).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}