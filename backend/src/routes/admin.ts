import express from 'express';
import { getAllUsers, createAdminUser, deleteUser } from '../controllers/adminController';
import { getAllContacts, deleteContact } from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// User management routes
router.get('/users', getAllUsers);
router.post('/users', createAdminUser);
router.delete('/users/:id', deleteUser);

// Contact management routes
router.get('/contacts', getAllContacts);
router.delete('/contacts/:id', deleteContact);

export default router;