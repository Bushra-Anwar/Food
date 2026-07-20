const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [{
    name: String,
    slug: String
  }],
  bannerImage: {
    type: String, // URL to right side promo banner
  },
  bannerText: {
    type: String,
  }
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
