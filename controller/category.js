// // category.js
// const Category = require("../model/category");

// // Create a new category
// const createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         if (!name) {
//           return res.status(400).json({ message: "Name is required" });
//         }

//         const existingCategory = await Category.findOne({ name });
//         if (existingCategory) {
//           return res.status(400).json({ message: "Category already exists" });
//         }

//         const category = await new Category({
//           name,
//         }).save();
//         res.status(201).json({ category });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     };

// // Get all categories
// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     return res.status(200).json({ categories });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Get category by ID
// const getCategoryById = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ error: "Category not found" });
//     }
//     return res.status(200).json({ category });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Update category by ID
// const updateCategoryById = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!category) {
//       return res.status(404).json({ error: "Category not found" });
//     }
//     return res.status(200).json({ category });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Delete category by ID
// const deleteCategoryById = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndDelete(req.params.id);
//     if (!category) {
//       return res.status(404).json({ error: "Category not found" });
//     }
//     return res.status(204).json();
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = {
//   createCategory,
//   getAllCategories,
//   getCategoryById,
//   updateCategoryById,
//   deleteCategoryById,
// } 

const Category = require('../model/category');
const Subcategory = require('../model/subcategory');

// Create a new category
// exports.createCategory = async (req, res) => {
//   try {
//     const category = new Category(req.body);
//     await category.save();
//     res.status(201).send(category);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };
exports.createCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const newCategory = new Category({ name });

    // if (parentId) {
    //   const parentCategory = await Category.findById(parentId);
    //   if (!parentCategory) {
    //     return res.status(404).json({ message: 'Parent category not found' });
    //   }
    //   parentCategory.subcategories.push(newCategory._id);
    //   await parentCategory.save();
    // }

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single category by ID
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(err);
  }
};
