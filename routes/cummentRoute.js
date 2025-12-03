const express = require("express");
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByCommenter,
  getCommentsByBlog,
  getCommentsByAuthor,
  getAllComments,
} = require("../controllers/commentController");
const isLoginIn =require("../middlewares/isLoginIn") // assuming JWT middleware
//const isAdmin=require("../middlewares/isAdmin")
// Create a comment on a blog
router.post("/:id/comment/add", isLoginIn, createComment);

// Update a comment
router.put("/comment/:commentId/update", isLoginIn, updateComment);

// Delete a comment
router.delete("/comment/:commentId/delete", isLoginIn, deleteComment);

// Get all comments by a commenter
router.get("/comments/commenter/:commenterId", getCommentsByCommenter);

// Get all comments on a specific blog
router.get("/comments/blog/:blogId", getCommentsByBlog);

// Get all comments on blogs written by an author
router.get("/comments/author/:authorId", getCommentsByAuthor);

// Get all comments
router.get("/comments",getAllComments);

module.exports = router;
