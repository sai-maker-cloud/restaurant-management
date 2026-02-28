import pool from "./config/db.js";

// Each dish gets a unique image (placeholder with dish name) so no two look the same
function dishImage(name) {
  return `https://placehold.co/400x260/c9a227/1a1a1a?text=${encodeURIComponent(name)}`;
}

const DISHES = [
  ["Samosa", 3.99, "Starters"],
  ["Pakora", 4.49, "Starters"],
  ["Paneer Tikka", 6.99, "Starters"],
  ["Chicken 65", 5.99, "Starters"],
  ["Aloo Tikki", 3.49, "Starters"],
  ["Tandoori Chicken (half)", 7.99, "Starters"],
  ["Onion Bhaji", 4.99, "Starters"],
  ["Papdi Chaat", 4.49, "Starters"],
  ["Paneer Butter Masala", 11.99, "Main Course"],
  ["Chana Masala", 9.99, "Main Course"],
  ["Dal Makhani", 10.49, "Main Course"],
  ["Palak Paneer", 11.49, "Main Course"],
  ["Aloo Gobi", 9.49, "Main Course"],
  ["Vegetable Biryani", 12.99, "Main Course"],
  ["Malai Kofta", 11.99, "Main Course"],
  ["Dal Tadka", 8.99, "Main Course"],
  ["Chicken Tikka Masala", 13.99, "Main Course"],
  ["Butter Chicken", 13.99, "Main Course"],
  ["Lamb Rogan Josh", 14.99, "Main Course"],
  ["Chicken Biryani", 13.49, "Main Course"],
  ["Fish Curry", 12.99, "Main Course"],
  ["Goat Curry", 14.49, "Main Course"],
  ["Tandoori Chicken (full)", 12.99, "Main Course"],
  ["Garlic Naan", 2.99, "Breads"],
  ["Plain Naan", 2.49, "Breads"],
  ["Butter Naan", 2.99, "Breads"],
  ["Roti", 1.99, "Breads"],
  ["Paratha", 3.49, "Breads"],
  ["Puri", 3.99, "Breads"],
  ["Plain Rice", 2.99, "Rice"],
  ["Jeera Rice", 3.49, "Rice"],
  ["Lemon Rice", 3.99, "Rice"],
  ["Gulab Jamun", 4.99, "Desserts"],
  ["Kheer", 4.49, "Desserts"],
  ["Ras Malai", 5.49, "Desserts"],
  ["Kulfi", 3.99, "Desserts"],
  ["Gajar Halwa", 4.99, "Desserts"],
  ["Mango Lassi", 3.99, "Beverages"],
  ["Sweet Lassi", 3.49, "Beverages"],
  ["Masala Chai", 2.49, "Beverages"],
  ["Chai", 1.99, "Beverages"],
  ["Fresh Lime Soda", 2.99, "Beverages"],
];

async function seed() {
  try {
    console.log("Adding user_id to orders if missing...");
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'user_id'
        ) THEN
          ALTER TABLE orders ADD COLUMN user_id INTEGER REFERENCES users(id);
        END IF;
      END $$;
    `);
  } catch (e) {
    console.log("Note (orders.user_id):", e.message);
  }

  try {
    console.log("Adding order_items columns if missing...");
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'order_items' AND column_name = 'order_id') THEN
          ALTER TABLE order_items ADD COLUMN order_id INTEGER REFERENCES orders(id);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'order_items' AND column_name = 'menu_id') THEN
          ALTER TABLE order_items ADD COLUMN menu_id INTEGER REFERENCES menu_items(id);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'order_items' AND column_name = 'quantity') THEN
          ALTER TABLE order_items ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'order_items' AND column_name = 'price') THEN
          ALTER TABLE order_items ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0;
        END IF;
      END $$;
    `);
  } catch (e) {
    console.log("Note (order_items):", e.message);
  }

  try {
    console.log("Adding image column if needed...");
    await pool.query(`
      DO $$ BEGIN
        ALTER TABLE menu_items ADD COLUMN image VARCHAR(500);
      EXCEPTION WHEN duplicate_column THEN NULL;
      END $$;
    `);
  } catch (e) {
    if (!e.message?.includes("duplicate_column")) console.log("Note:", e.message);
  }

  console.log("Clearing existing menu items...");
  await pool.query("DELETE FROM order_items");
  await pool.query("DELETE FROM menu_items");

  console.log("Inserting 40 Indian dishes (each with unique dish-name image)...");
  for (const [name, price, category] of DISHES) {
    const image = dishImage(name);
    await pool.query(
      "INSERT INTO menu_items (name, price, category, image) VALUES ($1, $2, $3, $4)",
      [name, price, category, image]
    );
  }

  console.log("Done! 40 menu items with images added. Refresh the Menu page in your app.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
