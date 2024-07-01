const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: process.env.TITLE_MAX_LENGTH,
  },
  subtitle: {
    type: String,
    maxlength: process.env.TITLE_MAX_LENGTH,
  },
  description: {
    type: String,
    maxlength: process.env.DESCRIPTION_MAX_LENGTH,
  },
  price: {
    type: Number,
    required: true,
  },
  specifications: {
    type: String,
    maxlength: process.env.SPECIFICATION_MAX_LENGTH,
  },
  type: {
    type: String,
    maxlength: process.env.TYPE_MAX_LENGTH,
  },
  profileImage: {
    type: String,
    maxlength: process.env.IMAGE_MAX_LENGTH,
  },
  source: {
    type: String,
    enum: ["rozetka", "telemart"],
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
