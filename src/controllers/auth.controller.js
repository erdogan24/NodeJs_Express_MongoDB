const user = require("../models/user.model");

const login = async (req, res) => {
  console.log(req.body);

  return res.json(req.body);
};

const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  console.log(req.body);
};

module.exports = {
  login,
  register,
};
