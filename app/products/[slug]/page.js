import pool from "@/lib/db";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { rows } = await pool.query("SELECT name FROM products WHERE slug = $1", [params.slug]);
  const product = rows[0];
  return { title: product ? product.name : "Not found" };
}

export async function generateStaticParams() {
  const { rows } = await pool.query("SELECT slug FROM products");
  return rows.map((row) => ({ slug: row.slug }));
}

export default async function ProductPage({ params }) {
  const { rows } = await pool.query("SELECT * FROM products WHERE slug = $1", [params.slug]);
  const product = rows[0];
  if (!product) notFound();

  return (
    <main>
      <img src={product.image_url} alt={product.name} className="w-full max-w-md" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>KES {(product.price_cents / 100).toLocaleString()}</p>
      <p>{product.in_stock > 0 ? `${product.in_stock} in stock` : "Out of stock"}</p>
    </main>
  );
}