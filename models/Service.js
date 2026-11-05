import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    benefits: [{ type: String }],
    icon: { type: String, default: 'fa-solid fa-star' },
    image: { type: String, default: '' },
    priceFrom: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);