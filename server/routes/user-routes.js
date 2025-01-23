import express from 'express';
import { registerUser } from '../controllers/user-controller.js';

const router = express.Router();

// Route pour l'enregistrement des utilisateurs
router.post('/register', registerUser);

export default router; 