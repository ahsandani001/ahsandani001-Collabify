import { Router } from 'express';

const router = Router();

// Auth routes
router.post('/register', () => {});
router.post('/login', () => {});
router.post('/logout', () => {});
router.post('/refresh-token', () => {});
router.post('/forgot-password', () => {});
router.post('/reset-password', () => {});

export default router;