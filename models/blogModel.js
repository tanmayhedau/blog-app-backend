const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      require: [true, "description is required"],
    },
    image: {
      type: String,
      require: [true, "image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "userId is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
