const express = require("express");
const router = express.Router();
const {
  createBlog,
  editBlog,
  findAllBlog,
  findOneBlog,
  deleteBlog,
} = require("../controllers/blogPostController");
const isLoggedIn = require("../middlewares/isLoginIn");

// CREATE blog
router.post("/create", isLoggedIn, createBlog);

// EDIT blog
router.put("/edit/:id", isLoggedIn, editBlog);

// GET ALL blogs
router.get("/", findAllBlog);

// GET ONE blog
router.get("/:id", findOneBlog);

// DELETE blog
router.delete("/delete/:id", isLoggedIn, deleteBlog);

module.exports = router;
