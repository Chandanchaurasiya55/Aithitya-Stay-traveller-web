import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  duration: { type: String, default: '3 Nights / 4 Days' },
  category: { type: String, default: 'Family Tours' },
  badge: { type: String, default: 'Popular' },
  badgeColor: { type: String, default: 'bg-[#0F382C]' },
  price: { type: String, required: true },
  priceUnit: { type: String, default: 'person' },
  rating: { type: String, default: '4.9 (100+ Reviews)' },
  image: { type: String, default: '' },
  specs: [{ type: String }],
  highlights: [{ type: String }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

packageSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const Package = mongoose.model('Package', packageSchema);
