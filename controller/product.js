const Product = require("../model/product");
const User = require("../model/user");

exports.createProduct = async (req, res) => {
  const {userRole}=req.user;
  if(!(userRole==='SUPER_ADMIN'||userRole==='PRODUCT_MANAGER')){
       return res.status(403).json({
        status:1,
        message:'You have not access to create product'
       })
  }
  
  try {
    const {
      productType,
            title,
            price,
            salePrice,
            image,
            shortDescription,
            description,
            categories,
            tags,
            catalogVisibility,
            inventory,
            shipping,
            tax,
            attributes,
            linkedProducts,
            mandatePoints,
            extraSustainabilityFields,
            minimumOrderQuantity,
            unitOfMeasure,
            productPolicies,
            advanced
    } = req.body;
    //const { image } = req.files;

    if (!productType || !title || !price ) {
      return res.status(400).json({ message: "Product type, title, price, and image are required" });
  }

  // Assuming you have the necessary models imported
  const existingProduct = await Product.findOne({ title });
  console.log(existingProduct,"existingproduct");
  if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
  }

    const newProduct = await new Product({
      
      productType,
            title,
            price,
            salePrice,
            image,
            shortDescription,
            description,
            categories,
            tags,
            catalogVisibility,
            inventory,
            shipping,
            tax,
            attributes,
            linkedProducts,
            mandatePoints,
            extraSustainabilityFields,
            minimumOrderQuantity,
            unitOfMeasure,
            productPolicies,
            advanced
    });
    console.log(newProduct,"newProduct");

    // Save the new product to the database
   const x= await newProduct.save();
   console.log(x,"x");

    // Send success response
    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    // Handle any errors that occur during product creation
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Product 

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the product as response
    res.status(200).json({ data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update Product 
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by its ID
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    product.set(req.body);
    const updatedProduct = await product.save();

    // Send success response with the updated product
    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete Product 
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by its ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send success response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all product 
exports.getAllProducts = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();

    // Send the products as response
    res.status(200).json({ 
      status:0,
      length: products.length,
      data: products 
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

