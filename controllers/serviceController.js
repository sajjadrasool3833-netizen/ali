import asyncHandler from 'express-async-handler';
import Service from '../models/Service.js';

// @desc    Get all published services (public)
export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ published: true }).sort({ createdAt: -1 });
  res.json(services);
});

// @desc    Get all services (admin)
export const getAllServicesAdmin = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
});

// @desc    Get service by slug
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json(service);
});

// @desc    Create service
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

// @desc    Update service
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json(service);
});

// @desc    Delete service
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({ message: 'Service deleted successfully' });
});