import pool from './db';

export async function ensureSchema() {
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL
    );
  `;
  try {
    await pool.query(createProductsTable);
  } catch {
    // swallow errors to allow server to run without DB
  }
}
