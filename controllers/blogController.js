import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';

export const getBlogs = asyncHandler(async (req, res) => {
  const items = await Blog.find({ published: true }).sort({ createdAt: -1 });
  res.json(items);
});

export const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  const items = await Blog.find().sort({ createdAt: -1 });
  res.json(items);
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const item = await Blog.findOne({ slug: req.params.slug });
  if (!item) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  res.json(item);
});

export const createBlog = asyncHandler(async (req, res) => {
  const item = await Blog.create(req.body);
  res.status(201).json(item);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const item = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  res.json(item);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
});