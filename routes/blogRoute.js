const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  userBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/all-blogs", getAllBlogs);
router.get("/blog/:id", getBlog);
router.post("/create-blog", createBlog);
router.put("/update-blog/:id", updateBlog);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/user-blog/:id", userBlog)

module.exports = router;
