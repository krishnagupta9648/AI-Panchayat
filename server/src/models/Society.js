import mongoose from 'mongoose';

const SocietySchema = new mongoose.Schema({
  societyCode: { type: String, required: true, unique: true }, // e.g., "greenvalley"
  name: { type: String, required: true }, // e.g., "Green Valley Residency"
  adminPhone: { type: String, required: true },
  plan: { type: String, enum: ['starter', 'growth', 'pro', 'enterprise'], default: 'starter' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Society || mongoose.model('Society', SocietySchema);
