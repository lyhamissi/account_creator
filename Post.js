const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }], 
  pricePersonal: { type: Number, required: true },
  priceBusiness: { type: Number, required: true },
  deliveryTime: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
