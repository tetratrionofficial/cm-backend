const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // vendor: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Assuming you have a User model for vendors
    //   required: true,
    // },
    productType: {
      type: String,
      enum: ["simple", "variable"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    image:{
      type:[String],
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    // categories: {
    //   type: mongoose.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
    // subCategories: {
    //   type: [String],
    // },
    
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
 
    tags: {
      type: [String],
    },
    catalogVisibility: {
      type: String,
      enum: ["shop", "search", "hidden"],
      default: "shop",
    },
    inventory: {
      sku: {
        type: String,
      },
      manageStock: {
        type: Boolean,
      },
      stockQty: {
        type: Number,
      },
      allowBackorders: {
        type: String,
        enum: ["no", "allow", "notify"],
      },
      soldIndividually: {
        type: Boolean,
      },
    },
    shipping: {
      weight: {
        type: Number,
      },
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      shippingClass: {
        type: String,
      },
      processingTime: {
        type: String,
        enum: [
          "1 business day",
          "1-2 business days",
          "1-3 business days",
          "3-5 business days",
          "1-2 weeks",
          "2-3 weeks",
          "3-4 weeks",
          "4-6 weeks",
          "6-8 weeks",
        ],
      },
    },
    tax: {
      taxStatus: {
        type: String,
        enum: ["taxable", "shipping only", "none"],
      },
      taxClass: {
        type: String,
        enum: ["standard", "reduced rate", "zero rate"],
      },
    },
    attributes: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        // active: Boolean,
        // options: [
        //   {
        //     value: String,
        //     price: Number,
        //     visibleOnProductPage: Boolean,
        //   },
        // ],
      },
    

    linkedProducts: {
      upSells: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      crossSells: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
    mandatePoints: {
      hsnCode: String,
      isAssemblyRequired: Boolean,
      powerSource: {
        type: [String],
        enum: ["Battery Power", "Solar Powered", "Corded"],
      },
    },
    extraSustainabilityFields: {
      sustainability: String,
    },
    minimumOrderQuantity: {
      type: Number,
    },
    unitOfMeasure: {
      type: String,
    },
    productPolicies: {
      overridePolicyFields: [String], // Assuming it's an array of policy fields
    },
    advanced: {
      enableReviews: {
        type: Boolean,
        default: true,
      },
      menuOrder: {
        type: Number,
      },
      purchaseNote: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
