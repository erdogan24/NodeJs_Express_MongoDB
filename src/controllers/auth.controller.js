const user = require("../models/user.model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log(req.body);

  return res.json(req.body);
};

const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  if (userCheck) {
    console.log("Email has already used");
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash password:", req.body.password);
};

module.exports = {
  login,
  register,
};
