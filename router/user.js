const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  deleteUser,
  updateUser,
  allUser,
} = require("../controller/user");

const { auth } = require("../middleware/auth");
const { createCategory, getCategoryById, updateCategoryById, deleteCategoryById, getAllCategories } = require("../controller/category");
const { createAttribute, getAllAttributes, updateAttributeById, deleteAttributeById } = require("../controller/attribute");
const { createSubCategory, getSubCategory, updateSubCategory, deleteSubCategory } = require("../controller/subcategory");

const { createProduct } = require("../controller/product");

//Create User 
router.post("/create-user", createUser);
router.post("/login", login);
router.get("/all-user", allUser);
router.delete("/delete-user/:id", auth, deleteUser);
router.patch("/update-user/:id", updateUser);


router.post("/create-category", createCategory);
router.get("/category", getAllCategories);
router.put("/update-category/:id", updateCategoryById);
router.delete("/delete-category/:id", deleteCategoryById);

router.post("/create-subcategory", createSubCategory);
router.get("/subcategory", getSubCategory);
router.put("/update-subcategory/:id", updateSubCategory);
router.delete("/delete-subcategory/:id", deleteSubCategory);

router.post("/create-attribute", createAttribute);
router.get("/attribute", getAllAttributes);
router.put("/update-attribute/:id", updateAttributeById);
router.delete("/delete-attribute/:id", deleteAttributeById);

router.post("/create-product",auth, createProduct);

module.exports = router;
