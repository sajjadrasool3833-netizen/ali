import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email and password');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    res.status(400);
    throw new Error('An account with this email already exists');
  }
  const admin = await Admin.create({ name, email, password, role: 'admin' });
  res.status(201).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  const match = await admin.matchPassword(password);
  if (!match) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id),
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('-password');
  res.json(admin);
});
