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

const { createProduct,getProduct, updateProduct , deleteProduct, getAllProducts } = require("../controller/product");
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("../controller/order");
const { createCustomer, customerlogin, allCustomers, deleteCustomer, updateCustomer ,  } = require("../controller/customer");
const { createCoupon, getCoupon, getAllCoupons, updateCoupon, deleteCoupon } = require("../controller/coupon");

//Create User 
router.post("/create-user", createUser);
router.post("/login", login);
router.get("/all-user", allUser);
router.delete("/delete-user/:id", auth, deleteUser);
router.patch("/update-user/:id", updateUser);


router.post("/create-category", createCategory);
router.get("/category", getAllCategories);
router.get("/category/:id", getCategoryById)
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
 router.get("/product/:id", getProduct);
 router.put("/update-product/:id", updateProduct);
 router.delete("/delete-product/:id", deleteProduct);
 router.get("/getallproduct", getAllProducts);

 router.post("/create-order", createOrder);
 router.get("/orders", getAllOrders);
 router.get("/order/:id", getOrderById);
 router.put("/update-order/:id", updateOrder);
 router.delete("/delete-order/:id", deleteOrder);

 router.post("/customer" , createCustomer);
 router.post("/customer-login",customerlogin );
router.get("/customers", allCustomers);
router.delete("/delete-customer/:id",  deleteCustomer);
router.patch("/update-customer/:id", updateCustomer);

router.post("/coupon", createCoupon);
router.get("/coupon/:id", getCoupon);
router.get("/coupons", getAllCoupons);
router.put("/coupon/:id", updateCoupon);
router.delete("/coupon/:id", deleteCoupon);

module.exports = router;
