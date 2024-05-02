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
