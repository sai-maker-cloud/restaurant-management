-- Run this in pgAdmin on your 'rest' database if you get:
-- column "menu_id" of relation "order_items" does not exist

-- Add missing columns to order_items (if they don't exist)
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
