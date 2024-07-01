const Order = require('../model/order');
const Product = require('../model/product');
const User = require('../model/user');

exports.createOrder = async (req, res) => {
  const { userId, products, paymentMethod, paymentDetails, shippingMethod, shippingCost, address, discountAmount, noteToCustomer } = req.body;

  try {
    // Validate user
    const user = await User.findById({_id:userId});
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // Validate products and calculate total price
    const productDetails = await Promise.all(products.map(async item => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    }));

    // Create new order
    const newOrder = new Order({
      user: user._id,
      products: productDetails.map(item => ({
        product: item.product,
        quantity: item.quantity,
      })),
      paymentMethod,
      paymentDetails,
      shippingMethod,
      shippingCost,
      address,
      discountAmount,
      noteToCustomer,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// All orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstname lastname email').populate('products.product');
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//get order
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('user', 'firstname lastname email').populate('products.product');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update order

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const order = await Order.findById({_id:id});
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (updateData.products) {
      const productDetails = await Promise.all(updateData.products.map(async item => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      }));
      updateData.products = productDetails.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }));
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true }).populate('user', 'firstname lastname email').populate('products.product');
    res.status(200).json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//delete order

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById({_id:id});
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const mongoose = require('mongoose');

// Get top selling products
exports.getTopSellingProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Set a default limit if not provided

    const topSellingProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalSold: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
    ]);

    res.status(200).json({ 
      status: 0,
      length: topSellingProducts.length,
      data: topSellingProducts 
    });
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Get total sales
exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: 0,
      data: totalSales[0] || { totalRevenue: 0, totalOrders: 0 },
    });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get sales by product
exports.getSalesByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const salesByProduct = await Order.aggregate([
      { $unwind: "$products" },
      { $match: { "products.product": mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: "$products.product",
          totalRevenue: { $sum: { $multiply: ["$products.quantity", "$products.price"] } },
          totalSold: { $sum: "$products.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
    ]);

    res.status(200).json({
      status: 0,
      data: salesByProduct[0] || { totalRevenue: 0, totalSold: 0 },
    });
  } catch (error) {
    console.error("Error fetching sales by product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get sales within a specific date range
exports.getSalesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const salesByDateRange = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: 0,
      data: salesByDateRange[0] || { totalRevenue: 0, totalOrders: 0 },
    });
  } catch (error) {
    console.error("Error fetching sales by date range:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

