const express =require("express")
  const router = express.Router()
const admincontroller=require("../controllers/adminController")


// admin routes 

router.post("/register",admincontroller.adminRegister)
router.post("/login",admincontroller.adminLogin)

module.exports = router