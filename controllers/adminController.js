const {users}= require("../database/connection")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
require ("dotenv").config()
// Register admin user
const adminRegister = async (req, res) => {

  try {
    const { userName, email, password, phone,secretKey } = req.body;
     // verify secret key
     if(secretKey!== process.env.ADMIN_REG_SECRET){
      return res.status(403).json({message:"Unauthorized to create admin"})
     }
    // Check if email already exists
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await users.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      role: "admin", // 👈 force admin role
    });

    return res.status(201).json({
      message: "✅ Admin registered successfully",
      admin: {
        id: newAdmin.id,
        userName: newAdmin.userName,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("❌ Error in adminRegister:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
   

    // Check if admin exists
    const admin = await users.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check role
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET , // 👈 put this in .env
      { expiresIn: "10h"}
    );

    return res.status(200).json({
      message: "✅ Admin logged in successfully",
      token,
      admin: {
        id: admin.id,
        userName: admin.userName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("❌ Error in adminLogin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { adminRegister, adminLogin }; 