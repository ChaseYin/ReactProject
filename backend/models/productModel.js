import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  brand: { type: String, required: false },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  user: { type: String, required: false },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
  expiryDate: {type: Date},
  type: {type: String},
  allocate: {type: String},
  proposition: {type: String},
  question: {type: String},
  needMaster: {type: String},
  answer: {type: String},
  IBMprocess: {type: String},
  audio: {type: String, required: false },
  audioText : {type: Array, required: false },
  awsAudio : {type: String, required: false }
});

const productModel = mongoose.model('Product', prodctSchema);

export default productModel;
