-- Run this in your PostgreSQL database if you get "table users not found"

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  roll       VARCHAR(50) DEFAULT 'staff'
);

CREATE TABLE IF NOT EXISTS menu_items (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(255) NOT NULL,
  price    DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  image    VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS orders (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER REFERENCES users(id),
  total          DECIMAL(10,2) DEFAULT 0,
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id       SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  menu_id  INTEGER REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  price    DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory (
  id        SERIAL PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  quantity  INTEGER NOT NULL,
  unit      VARCHAR(50)
);
