import express from 'express';
import {
  getPortfolio,
  getAllPortfolioAdmin,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPortfolio);
router.get('/admin/all', protect, getAllPortfolioAdmin);
router.post('/', protect, createPortfolio);
router.put('/:id', protect, updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

export default router;