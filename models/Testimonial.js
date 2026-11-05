import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientTitle: { type: String, default: '' },
    company: { type: String, default: '' },
    avatar: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    content: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);