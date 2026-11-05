import asyncHandler from 'express-async-handler';
import Testimonial from '../models/Testimonial.js';

export const getTestimonials = asyncHandler(async (req, res) => {
  const items = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
  res.json(items);
});

export const getAllTestimonialsAdmin = asyncHandler(async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: -1 });
  res.json(items);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json(item);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  res.json(item);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Testimonial deleted' });
});