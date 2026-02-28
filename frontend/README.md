# Restaurant Management – Frontend

React frontend for the Restaurant Management app. Uses Vite, React Router, and Framer Motion.

## Setup

```bash
npm install
```

## Run

Start the backend on port 5000 first, then:

```bash
npm run dev
```

Frontend runs at http://localhost:3000 and proxies `/api` to the backend.

## Features

- **Login / Register** – JWT auth with role (staff / admin)
- **Menu** – View menu; admins can add/delete items
- **Orders** – Add items from menu, place order
- **Payment** – Pay by order ID, view bill
- **Inventory** (admin) – Add and update inventory
- **Daily Sales** (admin) – Today’s total sales

## Backend env

Ensure the backend `.env` has `JWT_SECRET` set (used for auth).
