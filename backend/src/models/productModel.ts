export interface Product {
  id: number;
  name: string;
  price: number;
}

import pool from '../config/db';

export async function findAllProducts(): Promise<Product[]> {
  try {
    const result = await pool.query('SELECT id, name, price FROM products ORDER BY id DESC');
    return result.rows.map(row => ({
      ...row,
      price: Number(row.price)
    }));
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
    const row = result.rows[0];
    return row ? { ...row, price: Number(row.price) } : null;
  } catch {
    return null;
  }
}

export async function updateProductModel(id: number, data: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
  try {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.name) {
      fields.push(`name = $${idx++}`);
      values.push(data.name);
    }
    if (data.price) {
      fields.push(`price = $${idx++}`);
      values.push(data.price);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, price`;
    
    const result = await pool.query(query, values);
    const row = result.rows[0];
    return row ? { ...row, price: Number(row.price) } : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteProductModel(id: number): Promise<boolean> {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
