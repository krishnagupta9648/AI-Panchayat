import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  societyCode: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' },
  vendor: { type: String, default: '' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
