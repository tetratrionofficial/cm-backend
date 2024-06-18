const ProductReview = require('../model/productReview');
const Product = require('../model/product');
const Customer = require('../model/customer');

const createProductReview = async (req, res) => {
  try {
    const { productId, customerId, comment, rating, image } = req.body;

    const product = await Product.findById(productId);
    const customer = await Customer.findById(customerId);

    if (!product || !customer) {
      return res.status(404).json({ message: 'Product or Customer not found' });
    }

    const review = new ProductReview({
      product: productId,
      author: customerId,
      comment,
      rating,
      image,
    });

    await review.save();

    // Optionally, add review to the product's reviews array
    product.reviews.push(review);
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
