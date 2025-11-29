const login = async (requestAnimationFrame, res) => {
  console.log(req.body);

  return res.json(req.body);
};

const register = async (requestAnimationFrame, res) => {
  console.log(req.body);
};

module.exports = {
  login,
  register,
};
