import express from 'express';
import {
  getAllBeers,
  getBeerById,
} from '../Controllers/beer.controller.js';

const router = express.Router();

router.route('/').get(getAllBeers);

router.route('/:id').get(getBeerById);

export default router;
