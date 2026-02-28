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

## Deploy on Vercel

1. Push this repo to GitHub (you already have [sai-maker-cloud/restaurant-management](https://github.com/sai-maker-cloud/restaurant-management)).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import your repo.
3. **Root Directory:** leave as `.` (repo root).
4. **Environment Variables** (Project Settings → Environment Variables). Add:
   - `DB_USER` – PostgreSQL user
   - `DB_HOST` – e.g. your DB host (use a hosted DB like [Neon](https://neon.tech), [Vercel Postgres](https://vercel.com/storage/postgres), or [Supabase](https://supabase.com))
   - `DB_NAME` – database name
   - `DB_PASSWORD` – database password
   - `DB_PORT` – usually `5432`
   - `JWT_SECRET` – a long random string for auth
5. **Deploy.** Vercel will run `installCommand`, then `buildCommand`, and serve the frontend; `/api/*` is handled by the Express serverless function.

**Note:** Use a **hosted PostgreSQL** (Neon, Supabase, Vercel Postgres, Railway, etc.) and add its URL or connection details as the env vars above. Run **backend/schema.sql** (and optional **backend/seedMenu.js** via a one-off job or locally) to create tables and seed menu.

## Links

- **GitHub:** [sai-maker-cloud/restaurant-management](https://github.com/sai-maker-cloud/restaurant-management)
