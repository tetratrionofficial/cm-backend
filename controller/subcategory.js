// const SubCategory = require('../model/subcategory');

// const createSubCategory = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) {
//       return res.status(400).json({ message: "Name is required" });
//     }
    
//     const existingSubCategory = await SubCategory.findOne({ name });
//     if (existingSubCategory) {
//       return res.status(400).json({ message: "SubCategory already exists" });
//     }
//     const subCategory = await new SubCategory({
//       name,
//     }).save();
//     res.status(201).json({ subCategory });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const getSubCategory = async (req, res) => {
//     try {
//       const subCategories = await SubCategory.find();
//       res.status(200).json({ subCategories });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };


//   const updateSubCategory = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { name } = req.body;
  
//       if (!name) {
//         return res.status(400).json({ message: "Name is required" });
//       }
  
//       const existingSubCategory = await SubCategory.findById(id);
//       if (!existingSubCategory) {
//         return res.status(404).json({ message: "SubCategory not found" });
//       }
  
//       existingSubCategory.name = name;
//       await existingSubCategory.save();
  
//       res.status(200).json({ subCategory: existingSubCategory });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };

//   const deleteSubCategory = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const existingSubCategory = await SubCategory.findById(id);
  
//       if (!existingSubCategory) {
//         return res.status(404).json({ message: "SubCategory not found" });
//       }
  
//       await existingSubCategory.remove();
  
//       res.status(200).json({ message: "SubCategory deleted successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
  
  
  
  

// module.exports = {
//   createSubCategory,
//   getSubCategory,
//   updateSubCategory,
//   deleteSubCategory
// };

const Subcategory = require('../model/subcategory');

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const subcategory = new Subcategory(req.body);
    await subcategory.save();
    res.status(201).send(subcategory);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('parent').exec();
    res.status(200).send(subcategories);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single subcategory by ID
exports.getSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate('parent');
    if (!subcategory) {
      return res.status(404).send();
    }
    res.status(200).send(subcategory);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a subcategory by ID
exports.updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!subcategory) {
      return res.status(404).send();
    }
    res.status(200).send(subcategory);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a subcategory by ID
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      return res.status(404).send();
    }
    res.status(200).send(subcategory);
  } catch (err) {
    res.status(500).send(err);
  }
};

