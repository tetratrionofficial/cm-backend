const Refund = require('../model/refund');
const Order = require('../model/order');

// Create refund request
exports.createRefund = async (req, res) => {
  const { request_id, order_id, amount, type, reasons } = req.body;

  try {
    // Validate order
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(400).json({ message: "Invalid order" });
    }

    // Create new refund request
    const newRefund = new Refund({
      request_id,
      order_id,
      amount,
      type,
      reasons
    });

    await newRefund.save();
    res.status(201).json({ message: "Refund request created successfully", data: newRefund });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all refund requests
exports.getAllRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find().populate('order_id');
    res.status(200).json({ data: refunds });
  } catch (error) {
    console.error("Error fetching refunds:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get refund request by ID
exports.getRefundById = async (req, res) => {
  const { id } = req.params;

  try {
    const refund = await Refund.findById(id).populate('order_id');
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }
    res.status(200).json({ data: refund });
  } catch (error) {
    console.error("Error fetching refund:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update refund request
exports.updateRefund = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const refund = await Refund.findById(id);
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }

    const updatedRefund = await Refund.findByIdAndUpdate(id, updateData, { new: true }).populate('order_id');
    res.status(200).json({ message: "Refund updated successfully", data: updatedRefund });
  } catch (error) {
    console.error("Error updating refund:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete refund request
exports.deleteRefund = async (req, res) => {
  const { id } = req.params;

  try {
    const refund = await Refund.findById(id);
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }

    await Refund.findByIdAndDelete(id);
    res.status(200).json({ message: "Refund deleted successfully" });
  } catch (error) {
    console.error("Error deleting refund:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
