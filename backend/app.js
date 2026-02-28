import express from "express";
import cors from "cors";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentroutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    const r = await pool.query("SELECT current_user AS user, current_database() AS database");
    res.json({ ok: true, message: "Backend connected", db: r.rows[0] });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentroutes);

export { app };
