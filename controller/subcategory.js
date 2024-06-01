const SubCategory = require('../model/subcategory');

const createSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    
    const existingSubCategory = await SubCategory.findOne({ name });
    if (existingSubCategory) {
      return res.status(400).json({ message: "SubCategory already exists" });
    }
    const subCategory = await new SubCategory({
      name,
    }).save();
    res.status(201).json({ subCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubCategory = async (req, res) => {
    try {
      const subCategories = await SubCategory.find();
      res.status(200).json({ subCategories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  const updateSubCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
  
      const existingSubCategory = await SubCategory.findById(id);
      if (!existingSubCategory) {
        return res.status(404).json({ message: "SubCategory not found" });
      }
  
      existingSubCategory.name = name;
      await existingSubCategory.save();
  
      res.status(200).json({ subCategory: existingSubCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const deleteSubCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const existingSubCategory = await SubCategory.findById(id);
  
      if (!existingSubCategory) {
        return res.status(404).json({ message: "SubCategory not found" });
      }
  
      await existingSubCategory.remove();
  
      res.status(200).json({ message: "SubCategory deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  
  

module.exports = {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
};
