-- Script de criação do Banco de Dados V7 Store

-- 1. Criação da tabela de usuários (users)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer', -- 'admin' ou 'customer'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Criação da tabela de produtos (products)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

-- 3. Inserir usuário Admin Padrão
-- Email: admin@v7store.com
-- Senha: 123456
INSERT INTO users (name, email, password, role)
VALUES ('Administrador', 'admin@v7store.com', '$2b$10$n6f5nZGcZrMGSuowqJXH6eDKvSl7eNXMYkU26OYpx8N6aoH0rzeqW', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 4. Inserir alguns produtos de exemplo
INSERT INTO products (name, price) VALUES
('Camisa Brasil Amarela 2024', 349.90),
('Camisa Flamengo I 24/25', 299.90),
('Camisa Real Madrid Home', 329.90),
('Camisa Manchester City', 329.90),
('Chuteira Nike Zoom Mercurial', 599.90),
('Bola Adidas Oceaunz', 149.90),
('Boné V7 Store Aba Curva', 89.90),
('Meião Profissional Antiderrapante', 49.90);
