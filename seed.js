#!/usr/bin/env node
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rodah",
  database: "crm_db",
});

async function seed() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      price_cents INTEGER NOT NULL,
      image_url TEXT,
      in_stock INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    INSERT INTO products (slug, name, description, price_cents, image_url, in_stock) VALUES
      ('ethiopian-yirgacheffe', 'Ethiopian Yirgacheffe', 'Bright and floral single-origin coffee with citrus notes', 1200, 'https://images.unsplash.com/photo-1559092311-4c50040802be?w=400', 15),
      ('colombian-huila', 'Colombian Huila', 'Medium-bodied coffee with caramel sweetness and nutty finish', 1100, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', 22),
      ('kenyan-aa', 'Kenyan AA', 'Bold and winey with berry undertones and wine-like acidity', 1450, 'https://images.unsplash.com/photo-1447933631345-2f1eb0e34aec?w=400', 8),
      ('guatemalan-antigua', 'Guatemalan Antigua', 'Rich and full-bodied with chocolate and spice notes', 1300, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 12),
      ('sumatran-mandheling', 'Sumatran Mandheling', 'Earthy and complex with herbal notes and low acidity', 1250, 'https://images.unsplash.com/photo-1511920170033-f8396924c346?w=400', 18),
      ('costa-rican-tarrazu', 'Costa Rican Tarrazu', 'Clean and bright with honey and apple notes', 1150, 'https://images.unsplash.com/photo-1462654677199-9fa5b4e6f22b?w=400', 20),
      ('jamaican-blue-mountain', 'Jamaican Blue Mountain', 'Exceptionally smooth with mild flavor and sweet finish', 2800, 'https://images.unsplash.com/photo-1523970684751-4e68f6d1cd3a?w=400', 5),
      ('hawaiian-kona', 'Hawaiian Kona', 'Smooth and mellow with hints of nut and chocolate', 2200, 'https://images.unsplash.com/photo-1413613032812-6e270f7e3031?w=400', 10),
      ('tanzanian-peaberry', 'Tanzanian Peaberry', 'Special peaberry beans with intense flavor and winey acidity', 1500, 'https://images.unsplash.com/photo-1520323569230-c7f6c0a64b7f?w=400', 7),
      ('panama-geisha', 'Panama Geisha', 'Legendary coffee with tea-like characteristics and jasmine aroma', 3500, 'https://images.unsplash.com/photo-1504751502735-08b2a8a2b6c8?w=400', 3)
    ON CONFLICT (slug) DO NOTHING
  `);

  console.log("Database seeded successfully!");
  await pool.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});