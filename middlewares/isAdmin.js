const isAdmin = (req, res, next) => {
  try {
    // req.user comes from isLoggedIn
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error in isAdmin middleware" });
  }
};

module.exports = isAdmin;
