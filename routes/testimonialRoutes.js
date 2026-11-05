import express from 'express';
import {
  getTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/admin/all', protect, getAllTestimonialsAdmin);
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;