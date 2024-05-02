// attribute.js
const Attribute = require("../model/attribute");

// Create a new attribute
const createAttribute = async (req, res) => {
    
    try {
      const attribute = await Attribute.create(req.body);
      return res.status(201).json({ attribute });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Get all attributes
  const getAllAttributes = async (req, res) => {
    try {
      const attributes = await Attribute.find();
      return res.status(200).json({ attributes });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Get attribute by ID
  const getAttributeById = async (req, res) => {
    try {
      const attribute = await Attribute.findById(req.params.id);
      if (!attribute) {
        return res.status(404).json({ error: "Attribute not found" });
      }
      return res.status(200).json({ attribute });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Update attribute by ID
  const updateAttributeById = async (req, res) => {
    try {
      const attribute = await Attribute.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!attribute) {
        return res.status(404).json({ error: "Attribute not found" });
      }
      return res.status(200).json({ attribute });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Delete attribute by ID
  const deleteAttributeById = async (req, res) => {
    try {
      const attribute = await Attribute.findByIdAndDelete(req.params.id);
      if (!attribute) {
        return res.status(404).json({ error: "Attribute not found" });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = {
    createAttribute,
    getAllAttributes,
    getAttributeById,
    updateAttributeById,
    deleteAttributeById,
};
