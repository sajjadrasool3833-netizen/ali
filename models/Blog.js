import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'Ali Hamza' },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);