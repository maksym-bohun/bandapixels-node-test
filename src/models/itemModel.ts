const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 256,
  },
  subtitle: {
    type: String,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2048,
  },
  price: {
    type: Number,
    required: true,
  },
  specifications: {
    type: String,
    maxlength: 2048,
  },
  type: {
    type: String,
    maxlength: 128,
  },
  profileImage: {
    type: String,
    maxlength: 1024,
  },
  source: {
    type: String,
    enum: ["rozetka", "telemart"],
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
