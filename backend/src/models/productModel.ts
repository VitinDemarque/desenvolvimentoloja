export interface Product {
  id: number;
  name: string;
  price: number;
}

import pool from '../config/db';

export async function findAllProducts(): Promise<Product[]> {
  try {
    const result = await pool.query('SELECT id, name, price FROM products ORDER BY id DESC');
    return result.rows;
  } catch {
    return [];
  }
}

export async function createProductModel(data: Omit<Product, 'id'>): Promise<Product | null> {
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price',
      [data.name, data.price]
    );
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}
