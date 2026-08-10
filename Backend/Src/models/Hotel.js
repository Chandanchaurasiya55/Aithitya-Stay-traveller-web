import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  dest: { type: String, default: 'Nainital' },
  rating: { type: String, default: '4.8 (New)' },
  price: { type: String, required: true },
  image: { type: String, default: '' },
  tag: { type: String, default: 'Luxury Resort' },
  amenities: [{ type: String }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

hotelSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const Hotel = mongoose.model('Hotel', hotelSchema);
