const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(404).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs lists",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getAllBlogs callback",
      error,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "No blog found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Look at this blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getBlog callback",
      error,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find blog",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in createBlog callback",
      error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in updateBlog callback",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleteBlog callback",
      error,
    });
  }
};

exports.userBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await userModel.findById(id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      count: userBlog.blogs.length,
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in userBlog callback",
      error,
    });
  }
};
