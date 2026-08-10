import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  page: { type: String, required: true, enum: ['destinations', 'weddings', 'corporate'] },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

postSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const Post = mongoose.model('Post', postSchema);
