import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProducts);

// Protected routes (Admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), createProduct);
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateProduct);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteProduct);

export default router;
