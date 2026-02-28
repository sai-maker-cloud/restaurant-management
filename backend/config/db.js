import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

const { Pool } = pg;

const user = String(process.env.DB_USER || "postgres");
const host = String(process.env.DB_HOST || "localhost");
const database = String(process.env.DB_NAME || "postgres");
const password = String(process.env.DB_PASSWORD ?? "");
const port = Number(process.env.DB_PORT) || 5432;

// Use connection string so PostgreSQL gets credentials exactly as intended
const passwordEncoded = encodeURIComponent(password);
const connectionString = `postgresql://${encodeURIComponent(user)}:${passwordEncoded}@${host}:${port}/${encodeURIComponent(database)}`;

const pool = new Pool({ connectionString });

pool.on("error", (err) => {
  console.error("Pool error:", err.message);
});

export default pool;
