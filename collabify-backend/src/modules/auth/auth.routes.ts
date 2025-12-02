import { Router } from 'express';
import * as authController from './auth.controller';

const router = Router();

// Auth routes
router.post('/register', () => authController.register);
router.post('/login', () => authController.login);
router.post('/refresh-token', () => authController.refreshToken);

export default router;