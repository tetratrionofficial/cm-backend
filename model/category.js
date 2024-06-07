// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
  
//   subcategory: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "SubCategory",
//   }],
// }
// );

// const Category = mongoose.model("Category", categorySchema);

// module.exports = Category;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // subcategories: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Subcategory',
  // }],
});

module.exports = mongoose.model('Category', categorySchema);

