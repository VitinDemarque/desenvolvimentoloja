import { Request, Response } from 'express';
import { Product, findAllProducts, createProductModel } from '../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
  const products: Product[] = await findAllProducts();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body as Partial<Product>;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'Dados inválidos' });
  }
  const created = await createProductModel({ name, price });
  if (!created) {
    return res.status(500).json({ message: 'Falha ao criar produto' });
  }
  res.status(201).json(created);
};
