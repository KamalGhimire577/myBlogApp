const { blogs, blogbyauthor, category } = require("../database/connection");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const authorId = req.user.id; // from JWT middleware
    const { blogTitle, blogDescription, blogCategory, BlogImage } = req.body;

    if (!blogTitle || !blogDescription || !blogCategory) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = await blogs.create({
      authorId,
      blogTitle,
      blogDescription,
      blogCategory,
      blogImage: BlogImage,
    });

    // Add to blogbyauthor table
    await blogbyauthor.create({ blogid: newBlog.id, authorId });

    // Add to category table
    await category.create({
      blogId: newBlog.id,
      blogcategory: newBlog.blogCategory,
      authorId,
    });

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Blog creation error:", error);
    res
      .status(500)
      .json({ message: "Blog creation error", error: error.message });
  }
};

// EDIT BLOG
const editBlog = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { id } = req.params;
    const { blogTitle, blogDescription, blogCategory, BlogImage } = req.body;

    const blog = await blogs.findByPk(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.authorId !== authorId)
      return res.status(403).json({ message: "Not authorized" });

    await blog.update({
      blogTitle,
      blogDescription,
      blogCategory,
      blogImage: BlogImage,
    });

    // Update category table (optional: update instead of creating new)
    await category.update(
      { blogcategory: blog.blogCategory },
      { where: { blogId: blog.id } }
    );

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Edit blog error:", error);
    res
      .status(500)
      .json({ message: "Error updating blog", error: error.message });
  }
};

// GET ALL BLOGS (only blogs table)
const findAllBlog = async (req, res) => {
  try {
    const allBlogs = await blogs.findAll(); // only blogs table
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error("Find all blogs error:", error);
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

// GET ONE BLOG (only blogs table)
const findOneBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogs.findByPk(id); // only blogs table
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    console.error("Find blog error:", error);
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};


// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { id } = req.params;

    const blog = await blogs.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.authorId !== authorId)
      return res.status(403).json({ message: "Not authorized" });

    // Delete related entries
    await blogbyauthor.destroy({ where: { blogid: id } });
    await category.destroy({ where: { blogId: id } });

    await blog.destroy();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

module.exports = { createBlog, editBlog, findAllBlog, findOneBlog, deleteBlog };
