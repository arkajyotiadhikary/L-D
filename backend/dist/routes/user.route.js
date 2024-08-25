import { Router } from 'express';
import { registerUser, signInUser } from '../controllers/user.controller.js';
const router = Router();
router.post('/register', registerUser);
router.post('/login', signInUser);
export default router;
