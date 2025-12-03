const express = require("express")
const router = express.Router()
const adminDashboardController = require("../controllers/adminDashboardController")
const  isLoggedIn = require("../middlewares/isLoginIn")
const isAdmin = require("../middlewares/isAdmin")

// User management routes
router.post("/users", isLoggedIn, isAdmin, adminDashboardController.createUser)
router.get("/users", isLoggedIn, isAdmin, adminDashboardController.getAllUsers)
router.get("/users/:id", isLoggedIn, isAdmin, adminDashboardController.getUserById)
router.put("/users/:id", isLoggedIn, isAdmin, adminDashboardController.updateUser)
router.delete("/users/:id", isLoggedIn, isAdmin, adminDashboardController.deleteUser)

// Blog management routes
router.post("/blogs", isLoggedIn, isAdmin, adminDashboardController.createBlog)
router.get("/blogs", isLoggedIn, isAdmin, adminDashboardController.getAllBlogs)
router.get("/blogs/:id", isLoggedIn, isAdmin, adminDashboardController.getBlogById)
router.put("/blogs/:id", isLoggedIn, isAdmin, adminDashboardController.updateBlog)
router.delete("/blogs/:id", isLoggedIn, isAdmin, adminDashboardController.deleteBlog)

// Comment management routes
router.get("/comments", isLoggedIn, isAdmin, adminDashboardController.getAllComments)
router.get("/comments/:id", isLoggedIn, isAdmin, adminDashboardController.getCommentById)
router.delete("/comments/:id", isLoggedIn, isAdmin, adminDashboardController.deleteComment)

// Category management routes
router.post("/categories", isLoggedIn, isAdmin, adminDashboardController.createCategory)
router.get("/categories", isLoggedIn, isAdmin, adminDashboardController.getAllCategories)
router.get("/categories/:id", isLoggedIn, isAdmin, adminDashboardController.getCategoryById)
router.delete("/categories/:id", isLoggedIn, isAdmin, adminDashboardController.deleteCategory)

module.exports = router