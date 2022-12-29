const User = require("../models/User");
const validate = require("../helpers/Validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Inavalid E-mail" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const accessToken = jwt.sign(user._doc, process.env.SECRET, { expiresIn: "1 day" });

    return res.status(201).json({ user, accessToken });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.userRegister = async (req, res) => {
  try {
    let { name, email, number, role, password } = req.body;
    if (!name || !email || !number || !role || !password) {
      return res.status(204).json({ message: "Please enter you all information" });
    }
    if (!validate(email)) {
      return res.status(400).json({ message: "Invalid E-mail" });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "This Email already use. Try another" });
    }

    req.body.password = await bcrypt.hash(password, 10);
    const user = new User(req.body);
    await user.save();

    const accessToken = jwt.sign(user._doc, process.env.SECRET, { expiresIn: "1 day" });

    return res.status(201).json({ user, accessToken });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
