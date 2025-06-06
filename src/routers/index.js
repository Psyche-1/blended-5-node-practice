import { Router } from 'express';
import productsRouter from './products.js';
import authRouter from './auth.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/users', authRouter);

export default router;
