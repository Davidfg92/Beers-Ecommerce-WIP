import express from 'express';

const router = express.Router();

import {
  addToCart,
  deleteToCart,
  buyCart,
  getCartById,
} from '../Controllers/cart.controller.js';

router.route('/').post(addToCart).patch(buyCart).delete(deleteToCart);

router.route('/:id').get(getCartById);

export default router;
