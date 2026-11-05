import express from 'express';
import {
  getServices,
  getAllServicesAdmin,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.get('/admin/all', protect, getAllServicesAdmin);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

export default router;