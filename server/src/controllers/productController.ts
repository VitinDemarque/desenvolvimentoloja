import { Request, Response } from 'express';
import { Product } from '../models/productModel';

export const getProducts = (req: Request, res: Response) => {
  // Placeholder for fetching products from DB
  const products: Product[] = [
    { id: 1, name: 'Camisa Brasil 2026', price: 299.90 },
    { id: 2, name: 'Camisa Argentina 2026', price: 299.90 },
  ];
  res.json(products);
};

export const createProduct = (req: Request, res: Response) => {
  const newProduct = req.body;
  // Placeholder for saving to DB
  res.status(201).json({ message: 'Product created', product: newProduct });
};
