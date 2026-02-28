-- Run this in pgAdmin on your 'rest' database if menu_items already exists
-- (adds image column for existing table)

ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS image VARCHAR(500);
