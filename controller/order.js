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


