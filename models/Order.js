import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    packageName: { type: String, default: '' },
    projectDetails: { type: String, required: true },
    budget: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

orderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    this.orderNumber =
      'AHD-' + Date.now().toString().slice(-8) + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

export default mongoose.model('Order', orderSchema);