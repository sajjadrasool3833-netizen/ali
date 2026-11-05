import express from 'express';
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createContact); // public
router.get('/', protect, getContacts);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteContact);

export default router;