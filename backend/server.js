import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentroutes from "./routes/paymentRoutes.js";
dotenv.config();

const app=express();

app.use(cors());

app.use(express.json());

// Health check – test from browser: http://localhost:5000/api/health
app.get("/api/health", async (req, res) => {
  try {
    const r = await pool.query("SELECT current_user AS user, current_database() AS database");
    res.json({ ok: true, message: "Backend connected", db: r.rows[0] });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
});

app.use("/api/auth",authRoutes);
app.use("/api/menu",menuRoutes);
app.use("/api/inventory",inventoryRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payment",paymentroutes);
const PORT=process.env.PORT || 5000;

async function start() {
  const dbName = process.env.DB_NAME || "postgres";
  const dbUser = process.env.DB_USER || "postgres";
  console.log("Connecting to database '%s' as user '%s'...", dbName, dbUser);
  try {
    await pool.query("SELECT 1");
    console.log("Database connected.");
  } catch (err) {
    console.error("\n--- Database connection failed ---");
    console.error(err.message);
    if (err.message.includes("password authentication failed")) {
      console.error("\nFix: In backend/.env set DB_PASSWORD to your PostgreSQL password for user \"" + (process.env.DB_USER || "postgres") + "\".");
      console.error("Example: DB_PASSWORD=yourpassword\n");
    } else if (err.message.includes("does not exist")) {
      console.error("\nFix: Create the database, or use the default one.");
      console.error("  Option 1: In pgAdmin (or psql), create a database named \"" + (process.env.DB_NAME || "postgres") + "\".");
      console.error("  Option 2: In backend/.env set DB_NAME=postgres to use the default DB, then run backend/schema.sql in it.\n");
    } else {
      console.error("\nCheck backend/.env: DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT");
    }
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();