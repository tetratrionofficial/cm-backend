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
const { createCategory, getCategoryById, updateCategoryById, deleteCategoryById, getAllCategories, getCategories, getCategory, updateCategory, deleteCategory } = require("../controller/category");
const { createAttribute, getAllAttributes, updateAttributeById, deleteAttributeById } = require("../controller/attribute");
const { createSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, createSubcategory, getSubcategories, getSubcategory, updateSubcategory, deleteSubcategory } = require("../controller/subcategory");

const { createProduct,getProduct, updateProduct , deleteProduct, getAllProducts, getOutOfStockProducts, getLowStockProducts } = require("../controller/product");
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder, getTopSellingProducts, getSalesByDateRange, getSalesByProduct, getTotalSales } = require("../controller/order");
const { createCustomer, customerlogin, allCustomers, deleteCustomer, updateCustomer ,  } = require("../controller/customer");
const { createCoupon, getCoupon, getAllCoupons, updateCoupon, deleteCoupon } = require("../controller/coupon");
const { createRefund, deleteRefund, getAllRefunds, getRefundById , updateRefund } = require("../controller/refund");
const { addProductToStore, getProductsInStore, updateProductPriceInStore, deleteProductFromStore } = require("../controller/addToStrore");
const { createVendor, vendorLogin, allVendors, updateVendor, deleteVendor } = require("../controller/vendor");
const { sendMessage, adminSendMessage, getMessages } = require("../controller/chat");
const { followVendor, unfollowVendor, getFollowers } = require("../controller/follower");
const { createProductReview } = require("../controller/productReview");
const { createVendorReview } = require("../controller/vendorReview");

//Create User 
router.post("/create-user", createUser);
router.post("/login", login);
router.get("/all-user", allUser);
router.delete("/delete-user/:id", auth, deleteUser);
router.patch("/update-user/:id", updateUser);


router.post("/create-category", createCategory);
router.get("/category", getCategories);
router.get("/category/:id", getCategory)
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

router.post("/create-subcategory", createSubcategory);
router.get("/subcategory", getSubcategories);
router.put("/subcategory/:id", getSubcategory);
router.put("/update-subcategory/:id", updateSubcategory);
router.delete("/delete-subcategory/:id", deleteSubcategory);

router.post("/create-attribute", createAttribute);
router.get("/attribute", getAllAttributes);
router.put("/update-attribute/:id", updateAttributeById);
router.delete("/delete-attribute/:id", deleteAttributeById);

router.post("/create-product",auth, createProduct);
 router.get("/product/:id", getProduct);
 router.put("/update-product/:id", updateProduct);
 router.delete("/delete-product/:id", deleteProduct);
 router.get("/getallproduct", getAllProducts);
 router.get('/products/low-stock', getLowStockProducts);
router.get('/products/out-of-stock', getOutOfStockProducts);

 router.post("/create-order", createOrder);
 router.get("/orders", getAllOrders);
 router.get("/order/:id", getOrderById);
 router.put("/update-order/:id", updateOrder);
 router.delete("/delete-order/:id", deleteOrder);
 router.get('/orders/top-selling-products', getTopSellingProducts);
 router.get('/sales/total', getTotalSales);
router.get('/sales/by-product/:productId', getSalesByProduct);
router.get('/sales/by-date-range', getSalesByDateRange);

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


router.post('/refunds', createRefund);
router.get('/refunds', getAllRefunds);
router.get('/refunds/:id', getRefundById);
router.put('/refunds/:id', updateRefund);
router.delete('/refunds/:id',deleteRefund);

router.post('/addToStore', addProductToStore);
router.get('/addToStore', getProductsInStore);
router.put('/addToStore/:id', updateProductPriceInStore);
router.delete('/addToStore/:id', deleteProductFromStore);

router.post("/vendors" , createVendor);
router.post("/vendor",vendorLogin );
router.get("/vendors", allVendors);
router.delete("/delete-vendor/:id", deleteVendor);
router.patch("/update-vendor/:id", updateVendor);

router.post('/follow', followVendor);
router.post('/unfollow', unfollowVendor);
router.get('/vendors/:vendorId/followers', getFollowers);

router.post('/product-review', createProductReview);

router.post('/vendor-review', createVendorReview);

router.post('/send',sendMessage);
// Get messages between customer and vendor
router.get('/messages', getMessages );
// Admin view and participate in chat
router.post('/admin-send', adminSendMessage);


module.exports = router;


