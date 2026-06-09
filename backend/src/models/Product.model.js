const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    stockistCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    latestPurchaseRate: {
      type: Number,
      min: 0,
      default: 0
    },
    saleRate: {
      type: Number,
      min: 0,
      default: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number"
      }
    },
    minimumQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Minimum quantity must be a whole number"
      }
    },
    batch: {
      type: Number,
      min: 0,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
