const Admin = require("../models/Admin.model");
const asyncHandler = require("../utils/asyncHandler");
const { comparePassword, generateToken } = require("../utils/auth.utils");

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const admin = await Admin.findOne({ username: username.toLowerCase().trim() });

  if (!admin || !admin.isActive) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await comparePassword(password, admin.passwordHash);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({
    message: "Login successful",
    token: generateToken(admin),
    admin: {
      username: admin.username
    }
  });
});

const me = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("username isActive");

  if (!admin || !admin.isActive) {
    return res.status(401).json({ message: "Admin not found" });
  }

  return res.json({
    username: admin.username
  });
});

module.exports = { login, me };
