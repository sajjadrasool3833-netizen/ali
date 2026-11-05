import express from 'express';
import {
  getPackages,
  getAllPackagesAdmin,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/admin/all', protect, getAllPackagesAdmin);
router.post('/', protect, createPackage);
router.put('/:id', protect, updatePackage);
router.delete('/:id', protect, deletePackage);

export default router;