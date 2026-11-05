import asyncHandler from 'express-async-handler';
import Package from '../models/Package.js';

export const getPackages = asyncHandler(async (req, res) => {
  const pkgs = await Package.find({ published: true }).sort({ price: 1 });
  res.json(pkgs);
});

export const getAllPackagesAdmin = asyncHandler(async (req, res) => {
  const pkgs = await Package.find().sort({ createdAt: -1 });
  res.json(pkgs);
});

export const createPackage = asyncHandler(async (req, res) => {
  const pkg = await Package.create(req.body);
  res.status(201).json(pkg);
});

export const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  res.json(pkg);
});

export const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  res.json({ message: 'Package deleted successfully' });
});