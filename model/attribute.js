const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  
          
            active: Boolean,
            attribute_name: String,
            values: [String],
            visibleOnProductPage: Boolean,
            useAsVariation: Boolean,
            
  
});

const Attribute = mongoose.model("Attribute", attributeSchema);

module.exports = Attribute;