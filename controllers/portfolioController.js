import asyncHandler from 'express-async-handler';
import Portfolio from '../models/Portfolio.js';

export const getPortfolio = asyncHandler(async (req, res) => {
  const items = await Portfolio.find({ published: true }).sort({ createdAt: -1 });
  res.json(items);
});

export const getAllPortfolioAdmin = asyncHandler(async (req, res) => {
  const items = await Portfolio.find().sort({ createdAt: -1 });
  res.json(items);
});

export const createPortfolio = asyncHandler(async (req, res) => {
  const item = await Portfolio.create(req.body);
  res.status(201).json(item);
});

export const updatePortfolio = asyncHandler(async (req, res) => {
  const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    res.status(404);
    throw new Error('Portfolio item not found');
  }
  res.json(item);
});

export const deletePortfolio = asyncHandler(async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ message: 'Portfolio item deleted' });
});