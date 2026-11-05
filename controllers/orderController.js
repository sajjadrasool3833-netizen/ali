import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc    Create order (public)
export const createOrder = asyncHandler(async (req, res) => {
  const { customerName, whatsapp, email, service, projectDetails, budget } = req.body;

  if (!customerName || !whatsapp || !email || !service || !projectDetails || !budget) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  const order = await Order.create(req.body);
  res.status(201).json({
    message: 'Order placed successfully',
    order,
  });
});

// @desc    Get all orders (admin)
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get single order
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(order);
});

// @desc    Update order status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, notes: req.body.notes },
    { new: true }
  );
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(order);
});

// @desc    Delete order
export const deleteOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted successfully' });
});