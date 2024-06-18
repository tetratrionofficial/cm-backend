const Product = require("../model/product");
const AddToStore = require("../model/addToStore");

// Add product to store
exports.addProductToStore = async (req, res) => {
  try {
    const { productId, price } = req.body;
    console.log(req.user);
    const userId = req.user._id;
    

    if (!productId || !price) {
      return res.status(400).json({ message: "Product ID and price are required" });
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let addToStoreEntry = await AddToStore.findOne({ productId, userId });

    if (addToStoreEntry) {
      addToStoreEntry.price = price;
    } else {
      addToStoreEntry = new AddToStore({
        productId,
        userId,
        price
      });
    }

    await addToStoreEntry.save();

    res.status(200).json({ message: "Product added to store successfully", data: addToStoreEntry });
  } catch (error) {
    console.error("Error adding product to store:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get product in store
exports.getProductsInStore = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const productsInStore = await AddToStore.find({ userId }).populate('productId');
  
      res.status(200).json({ data: productsInStore });
    } catch (error) {
      console.error("Error fetching products in store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
 
  //update price in store
  exports.updateProductPriceInStore = async (req, res) => {
    try {
      const { productId, price } = req.body;
      const userId = req.user._id;
  
      const addToStoreEntry = await AddToStore.findOne({ productId, userId });
  
      if (!addToStoreEntry) {
        return res.status(404).json({ message: "Product not found in store" });
      }
  
      addToStoreEntry.price = price;
      await addToStoreEntry.save();
  
      res.status(200).json({ message: "Product price updated successfully", data: addToStoreEntry });
    } catch (error) {
      console.error("Error updating product price in store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // delete product in store
  exports.deleteProductFromStore = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user._id;
  
      const addToStoreEntry = await AddToStore.findOneAndDelete({ productId, userId });
  
      if (!addToStoreEntry) {
        return res.status(404).json({ message: "Product not found in store" });
      }
  
      res.status(200).json({ message: "Product removed from store successfully" });
    } catch (error) {
      console.error("Error removing product from store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
