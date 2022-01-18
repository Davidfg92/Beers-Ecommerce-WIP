import express from 'express';
import { logUser } from '../Controllers/login.controller.js';

const router = express.Router();

router.route('/').post(logUser);

export default router;
