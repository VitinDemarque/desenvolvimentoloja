import { Request, Response } from 'express';
import { Product, findAllProducts, createProductModel, updateProductModel, deleteProductModel } from '../models/productModel';

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

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body as Partial<Product>;
  
  const updateData: Partial<Product> = {};
  if (name !== undefined) updateData.name = name;
  if (price !== undefined) updateData.price = price;

  const updated = await updateProductModel(Number(id), updateData);
  if (!updated) {
    return res.status(404).json({ message: 'Produto não encontrado ou falha ao atualizar' });
  }
  res.json(updated);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const success = await deleteProductModel(Number(id));
  if (!success) {
    return res.status(404).json({ message: 'Produto não encontrado ou falha ao deletar' });
  }
  res.status(204).send();
};
