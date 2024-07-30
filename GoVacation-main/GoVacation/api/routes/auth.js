import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

// create a new user
router.post('/', register);

// login user
router.post("/login", login);





export default router;