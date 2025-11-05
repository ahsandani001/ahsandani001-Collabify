import { Router } from 'express';

const router = Router();

// Workspace routes
router.get('/', () => {});
router.post('/', () => {});
router.get('/:id', () => {});
router.put('/:id', () => {});
router.delete('/:id', () => {});
router.post('/:id/members', () => {});
router.delete('/:id/members/:userId', () => {});

export default router;