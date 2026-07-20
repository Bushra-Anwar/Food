const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Get all products or search/filter by category/subcategory
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { keyword, category, subcategory } = req.query;
    let query = {};
    
    if (keyword) {
        query.name = { $regex: keyword, $options: 'i' };
    }
    if (category) {
        // Need to find category by slug first if passed as slug
        const cat = await Category.findOne({ slug: category });
        if(cat) query.category = cat._id;
    }
    if (subcategory) {
        query.subcategory = subcategory;
    }

    const products = await Product.find(query).populate('category', 'name slug');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all categories with subcategories
// @route   GET /api/products/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getCategories };
