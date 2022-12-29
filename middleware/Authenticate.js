const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const email = decoded.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = Authenticate;
