import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tier: {
      type: String,
      enum: ['Basic', 'Standard', 'Premium', 'Custom'],
      required: true,
    },
    price: { type: Number, required: true },
    features: [{ type: String }],
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    popular: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Package', packageSchema);