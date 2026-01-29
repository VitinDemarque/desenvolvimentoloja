import pool from '../config/db';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  created_at?: Date;
}

export const createUser = async (user: User): Promise<User> => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
    [user.name, user.email, user.password, user.role || 'customer']
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};
