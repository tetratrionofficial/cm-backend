const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  followedAt: {
    type: Date,
  }
}, { timestamps: true });

const Follower = mongoose.model('Follower', followerSchema);

module.exports = Follower;
