const { blogs, cumment } = require("../database/connection");

// ✅ Create Comment
const createComment = async (req, res) => {
  try {
    const { id } = req.params; // blogId
    const { commenter_Name, commentor_message, commentor_Email } = req.body;
    const commenterId = req.user.id; // logged-in user

    const blog = await blogs.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = await cumment.create({
      blogId: id,
      authorId: blog.authorId, // blog writer
      commenterId,
      commenter_Name,
      commentor_message,
      commentor_Email,
    });

    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Comment creation failed", error: error.message });
  }
};

// ✅ Update Comment (only by owner)
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentor_message } = req.body;
    const userId = req.user.id;

    const comment = await cumment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.commenterId !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this comment" });
    }

    comment.commentor_message = commentor_message || comment.commentor_message;
    await comment.save();

    res.json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// ✅ Delete Comment (only by owner)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await cumment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.commenterId !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

// ✅ Get all comments by commenterId
const getCommentsByCommenter = async (req, res) => {
  try {
    const { commenterId } = req.params;
    const comments = await cumment.findAll({ where: { commenterId } });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

// ✅ Get all comments on a specific blog
const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await cumment.findAll({ where: { blogId } });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

// ✅ Get all comments on blogs of a specific author
const getCommentsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const comments = await cumment.findAll({ where: { authorId } });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

// ✅ Get all comments (for admin / general list)
const getAllComments = async (req, res) => {
  try {
    const comments = await cumment.findAll();
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByCommenter,
  getCommentsByBlog,
  getCommentsByAuthor,
  getAllComments,
};
