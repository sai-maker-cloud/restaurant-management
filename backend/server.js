import dotenv from "dotenv";

import { app } from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

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