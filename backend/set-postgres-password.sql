-- Run this in pgAdmin (Query Tool, connected to your server) if you get
-- "password authentication failed for user postgres".
-- This sets the postgres user's password to: root
-- Then in backend/.env use: DB_PASSWORD=root

ALTER USER postgres WITH PASSWORD 'root';
