// const mongoose = require("mongoose");

// const subCategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//   },
// });

// const SubCategory = mongoose.model("SubCategory", subCategorySchema);

// module.exports = SubCategory;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: {
    type: [String],
    required: true,
    unique: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});                      

module.exports = mongoose.model('Subcategory', subcategorySchema);
