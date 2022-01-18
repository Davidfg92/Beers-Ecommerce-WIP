import express from 'express';
import {
  getAllUsers,
  addUser,
  getUserById,
} from '../Controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(addUser);

router.route('/:id').get(getUserById);

export default router;
