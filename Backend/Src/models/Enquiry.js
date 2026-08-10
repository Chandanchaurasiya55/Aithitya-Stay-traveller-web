import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  destination: { type: String, default: 'Uttarakhand' },
  service: { type: String, default: 'General Enquiry' },
  guests: { type: String, default: '2 Guests' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Contacted', 'Resolved', 'Cancelled'], default: 'Pending' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Use existing virtual id format
enquirySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
