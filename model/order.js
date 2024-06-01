const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true 
    },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Product', 
         required: true 
        },
    quantity: { 
        type: Number,
         required: true 
        },
  }],
  paymentMethod: {
     type: String,
      enum: ['stripe', 'upi'],
       required: true 
    },
  paymentDetails: {
    stripe: { type: String },
    upi: { type: String },
  },
  shippingMethod: {
     type: String, 
     required: true 
    },
  shippingCost: {
     type: Number,
      required: true 
    },
  address: {
    billing: {
      firstName: {
         type: String, 
         required: true 
        },
      lastName: {
         type: String,
          required: true 
        },
      phone: {
         type: String, 
         required: true 
        },
      address1: {
         type: String,
          required: true 
        },
      address2: {
         type: String 
        },
      country: {
         type: String,
          required: true 
        },
      city: {
         type: String, 
         required: true 
        },
      state: { 
        type: String,
         required: true 
        },
      postcode: {
         type: String, 
         required: true 
        },
    },
    shipping: {
      sameAsBilling: { 
        type: Boolean, 
        default: false 
    },
    //   firstName: { type: String },
    //   lastName: { type: String },
    //   phone: { type: String },
    //   address1: { type: String },
    //   address2: { type: String },
    //   country: { type: String },
    //   city: { type: String },
    //   state: { type: String },
    //   postcode: { type: String },
    },
  },
  discountAmount: { 
    type: Number, 
    default: 0 
},
  noteToCustomer: {
     type: String 
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
