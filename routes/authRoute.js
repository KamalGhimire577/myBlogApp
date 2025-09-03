const express = require("express");
const router = express.Router()
const authcontroller = require("../controllers/authController")


// public routes

router.post("/register",authcontroller.registerAuthor)
router.post("/login",authcontroller.loginAuthor)
module.exports = router