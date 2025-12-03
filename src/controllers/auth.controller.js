const { response } = require("express");
const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const login = async (req, res) => {
  const { email, password } = req.body;

  const userInfo = await user.findOne({ email });

  console.log(userInfo);

  if (!userInfo) throw new APIError("Email or Password is wrong !", 401);

  const comparePassword = await bcrypt.compare(password, userInfo.password);
  console.log(comparePassword);

  if (!comparePassword) throw new APIError("Email or Password is wrong !", 401);
  return res.json(req.body);
};

const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError("Email has already used", 401);
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash password:", req.body.password);

  const userSave = new user(req.body);
  await userSave
    .save()
    .then((data) => {
      return new Response(data, " has been registered").created(res);
    })
    .catch((err) => {
      throw new APIError("User could not be register", 400);
    });
};

module.exports = {
  login,
  register,
};
