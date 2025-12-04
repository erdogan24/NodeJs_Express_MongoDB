const jwt = require("jsonwebtoken");
const APIError = require("../utils/errors");
const user = require("../models/user.model");

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
  console.log("Token check inside");

  const headerToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ");

  console.log(headerToken);

  if (!headerToken) throw new APIError("Please Sign In", 401);

  const token = req.headers.authorization.split(" ")[1];

  console.log(token);

  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Invalid Token", 401);

    const userInfo = await user
      .findById(decoded.sub)
      .select("_id name lastname email");

    console.log(userInfo);

    if (!userInfo) throw new APIError("Invalid Token", 401);
    req.user = userInfo;
  });
  next();
};
module.exports = {
  createToken,
  tokenCheck,
};
