
const { sequelize, Sequelize, users, blogs, blogbyauthor, category, cumment } = require('../database/connection');
const adminDashboardController = {
  // Users
  createUser: async (req, res) => {
    try {
      const { userName, email, password, phone, role } = req.body;
      
      if (!userName || !email || !password || !phone) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required', 
          error: 'Missing required fields' 
        });
      }
      
     
      const existingUser = await users.findOne({ where: { email } });
      
      if (existingUser) {
        return res.status(409).json({ 
          success: false, 
          message: 'Email already exists', 
          error: 'User with this email already registered' 
        });
      }
      
      const user = await users.create(req.body);
      res.status(201).json({ 
        success: true, 
        message: 'User created successfully', 
        data: user 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to create user', 
        error: error.message 
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const allUsers = await users.findAll();
      res.status(200).json({ 
        success: true, 
        message: 'Users retrieved successfully', 
        data: allUsers, 
        count: allUsers.length 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve users', 
        error: error.message 
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID is required', 
          error: 'Missing user ID' 
        });
      }
      
      const user = await users.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found', 
          error: 'No user found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'User retrieved successfully', 
        data: user 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve user', 
        error: error.message 
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, email, password, phone, role } = req.body;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID is required', 
          error: 'Missing user ID' 
        });
      }
      
      const updateData = {};
      if (userName) updateData.userName = userName;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (phone) updateData.phone = phone;
      if (role) updateData.role = role;
      
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'No fields to update', 
          error: 'At least one field must be provided' 
        });
      }
      
      if (email) {
        const { Op } = require('sequelize');
        const existingUser = await users.findOne({ where: { email, id: { [Op.ne]: id } } });
        
        if (existingUser) {
          return res.status(409).json({ 
            success: false, 
            message: 'Email already exists', 
            error: 'Another user with this email already exists' 
          });
        }
      }
      
      const [updated] = await users.update(updateData, { where: { id } });
      
      if (!updated) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found', 
          error: 'No user found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'User updated successfully' 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to update user', 
        error: error.message 
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID is required', 
          error: 'Missing user ID' 
        });
      }
      
      const deleted = await users.destroy({ where: { id } });
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found', 
          error: 'No user found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'User deleted successfully' 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to delete user', 
        error: error.message 
      });
    }
  },

  // Blogs
  createBlog: async (req, res) => {
    try {
      const { authorId, blogTitle, blogDescription, blogCategory } = req.body;
      
      if (!authorId || !blogTitle || !blogDescription || !blogCategory) {
        return res.status(400).json({ 
          success: false, 
          message: 'All required fields must be provided', 
          error: 'Missing required fields' 
        });
      }
      
      const blog = await blogs.create(req.body);
      res.status(201).json({ 
        success: true, 
        message: 'Blog created successfully', 
        data: blog 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to create blog', 
        error: error.message 
      });
    }
  },

  getAllBlogs: async (req, res) => {
    try {
      const allBlogs = await blogs.findAll({ include: [{ model: users, as: 'author' }] });
      res.status(200).json({ 
        success: true, 
        message: 'Blogs retrieved successfully', 
        data: allBlogs, 
        count: allBlogs.length 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve blogs', 
        error: error.message 
      });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Blog ID is required', 
          error: 'Missing blog ID' 
        });
      }
      
      const blog = await blogs.findByPk(id, { include: [{ model: users, as: 'author' }] });
      
      if (!blog) {
        return res.status(404).json({ 
          success: false, 
          message: 'Blog not found', 
          error: 'No blog found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Blog retrieved successfully', 
        data: blog 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve blog', 
        error: error.message 
      });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Blog ID is required', 
          error: 'Missing blog ID' 
        });
      }
      
      const [updated] = await blogs.update(req.body, { where: { id } });
      
      if (!updated) {
        return res.status(404).json({ 
          success: false, 
          message: 'Blog not found', 
          error: 'No blog found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Blog updated successfully' 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to update blog', 
        error: error.message 
      });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Blog ID is required', 
          error: 'Missing blog ID' 
        });
      }
      
      const deleted = await blogs.destroy({ where: { id } });
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: 'Blog not found', 
          error: 'No blog found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Blog deleted successfully' 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to delete blog', 
        error: error.message 
      });
    }
  },

  // Comments
  getAllComments: async (req, res) => {
    try {
      const comments = await cumment.findAll({ include: [{ model: blogs, as: 'blog' }] });
      res.status(200).json({ 
        success: true, 
        message: 'Comments retrieved successfully', 
        data: comments, 
        count: comments.length 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve comments', 
        error: error.message 
      });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Comment ID is required', 
          error: 'Missing comment ID' 
        });
      }
      
      const comment = await cumment.findByPk(id, { include: [{ model: blogs, as: 'blog' }] });
      
      if (!comment) {
        return res.status(404).json({ 
          success: false, 
          message: 'Comment not found', 
          error: 'No comment found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Comment retrieved successfully', 
        data: comment 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve comment', 
        error: error.message 
      });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Comment ID is required', 
          error: 'Missing comment ID' 
        });
      }
      
      const deleted = await cumment.destroy({ where: { id } });
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: 'Comment not found', 
          error: 'No comment found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Comment deleted successfully' 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to delete comment', 
        error: error.message 
      });
    }
  },

  // Categories
  createCategory: async (req, res) => {
    try {
      const { blogId, blogcategory, authorId } = req.body;
      
      if (!blogId || !blogcategory || !authorId) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required', 
          error: 'Missing required fields' 
        });
      }
      
      const categoryData = await category.create(req.body);
      res.status(201).json({ 
        success: true, 
        message: 'Category created successfully', 
        data: categoryData 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to create category', 
        error: error.message 
      });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await category.findAll();
      res.status(200).json({ 
        success: true, 
        message: 'Categories retrieved successfully', 
        data: categories, 
        count: categories.length 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve categories', 
        error: error.message 
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Category ID is required', 
          error: 'Missing category ID' 
        });
      }
      
      const categoryData = await category.findByPk(id);
      
      if (!categoryData) {
        return res.status(404).json({ 
          success: false, 
          message: 'Category not found', 
          error: 'No category found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Category retrieved successfully', 
        data: categoryData 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve category', 
        error: error.message 
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Category ID is required', 
          error: 'Missing category ID' 
        });
      }
      
      const deleted = await category.destroy({ where: { id } });
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: 'Category not found', 
          error: 'No category found with this ID' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Category deleted successfully' 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to delete category', 
        error: error.message 
      });
    }
  }
};

module.exports = adminDashboardController;