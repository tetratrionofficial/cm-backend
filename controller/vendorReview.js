const VendorReview = require('../model/vendorReview');
const Vendor = require('../model/vendor');
const Product = require('../model/product');
const Customer = require('../model/customer');

const createVendorReview = async (req, res) => {
  try {
    const { vendorId, productId, customerId, comment, rating } = req.body;

    const vendor = await Vendor.findById(vendorId);
    const product = await Product.findById(productId);
    const customer = await Customer.findById(customerId);

    if (!vendor || !product || !customer) {
      return res.status(404).json({ message: 'Vendor, Product or Customer not found' });
    }

    const review = new VendorReview({
      vendor: vendorId,
      author: customerId,
      product: productId,
      comment,
      rating,
    });

    await review.save();

    // Optionally, add review to the vendor's reviews array
    vendor.reviews.push(review);
    await vendor.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
