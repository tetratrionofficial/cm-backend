const mongoose = require("mongoose");

const addToStoreSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

const AddToStore = mongoose.model("AddToStore", addToStoreSchema);

module.exports = AddToStore;
