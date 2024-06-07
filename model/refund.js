const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  request_id: {
     type: String, 
     required: true 
    },
  order_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true
 },
  amount: {
     type: Number,
      required: true 
    },
  type: {
     type: String, 
     required: true 
    },
  reasons: { 
    type: String, 
    required: true
 },
  date: {
     type: String, 
    //  default: Date.now 
    },
},{ timestamps: true }
);

module.exports = mongoose.model('Refund', refundSchema);
