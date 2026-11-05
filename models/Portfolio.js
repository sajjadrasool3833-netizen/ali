import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    projectUrl: { type: String, default: '' },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Portfolio', portfolioSchema);