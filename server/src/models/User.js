import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true }, // e.g. "9876543210"
  societyCode: { type: String, required: true }, // Ties user to a society
  name: { type: String, required: true }, // e.g. "Rahul Gupta"
  role: { type: String, enum: ['resident', 'admin', 'superadmin'], default: 'resident' },
  flatNumber: { type: String }, // e.g. "B-404"
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
