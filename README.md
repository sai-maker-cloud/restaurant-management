# Restaurant Management (Full Stack)

Full-stack restaurant management: Node.js/Express backend + React frontend with menu, orders, inventory, payment, and auth.

## Repo structure

- **backend/** – Express API (PostgreSQL, JWT auth, menu, orders, inventory, payment)
- **frontend/** – React (Vite) app with login, menu, place order, payment, admin inventory & daily sales

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env   # then set DB_* and JWT_SECRET
npm install
npm run seed           # optional: add user_id/order_items columns + 40 Indian dishes
npm start
```

Runs at **http://localhost:5000**.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at **http://localhost:3000** and proxies `/api` to the backend.

### 3. Database

- PostgreSQL with a database (e.g. `rest`).
- Run **backend/schema.sql** to create tables (or use the seed script; it can add missing columns).
- In **backend/.env** set: `DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT`, `JWT_SECRET`.

## Links

- **GitHub:** [sai-maker-cloud/restaurant-management](https://github.com/sai-maker-cloud/restaurant-management)
