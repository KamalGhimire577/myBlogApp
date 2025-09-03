import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";

const isLoggedIn = async (req, res, next) => {
  try {
    // ✅ Get token from "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please provide a valid token" });
    }

    const token = authHeader.split(" ")[1]; // only token part

    // ✅ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET 
    );

    // ✅ Find user in DB
    const userData = await User.findByPk(decoded.id, {
      attributes: ["id", "email", "role"], // keep only needed fields
    });

    if (!userData) {
      return res.status(403).json({ message: "Invalid token: user not found" });
    }

    // ✅ Attach user to request (so next routes can use it)
    req.user = userData;

    next(); // go ahead
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

export default isLoggedIn;
