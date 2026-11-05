import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

// @desc    Send contact message (public)
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  const item = await Contact.create(req.body);
  res.status(201).json({
    message: 'Message sent successfully',
    data: item,
  });
});

// @desc    Get all messages (admin)
export const getContacts = asyncHandler(async (req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 });
  res.json(items);
});

// @desc    Mark as read
export const markAsRead = asyncHandler(async (req, res) => {
  const item = await Contact.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!item) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json(item);
});

// @desc    Delete message
export const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Message deleted' });
});