const jwt = require("jsonwebtoken");
const APIError = require("../utils/errors");

const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return res.status(201).json({
    success: true,
    token,
    message: "Successfull",
  });
};
const tokenCheck = async (req, res, next) => {
  const headerToken =
    req.headers.authorization.startsWith("Bearer ") &&
    req.headers.authorization;
  console.log(headerToken);

  if (!headerToken) throw new APIError("Please Sign In", 401);

  next();
};
module.exports = {
  createToken,
  tokenCheck,
};
