-- Run this in pgAdmin on your 'rest' database if you get:
-- column "user_id" of relation "orders" does not exist

-- Add user_id column to orders (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN user_id INTEGER REFERENCES users(id);
  END IF;
END $$;
