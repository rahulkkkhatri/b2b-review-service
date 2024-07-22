const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
  }, // shop
  review_type: {
    type: String,
  },
  shop_id: {
    type: Schema.Types.ObjectId,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
  images: [],
  product_id: {
    type: Schema.Types.ObjectId,
  },
  rating: {
    type: Number,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('review', reviewSchema);