const jwt = require("jsonwebtoken");

function generateToken(id) {
  const pass = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_DURATION;

  return jwt.sign({ id }, pass, {
    expiresIn,
  });
}

function generateRefreshToken(id) {
  const pass = process.env.JWT_SECRET_REFRESH;
  const expiresIn = process.env.JWT_DURATION;

  return jwt.sign({ id }, pass, {
    expiresIn,
  });
}

module.exports = {
  generateToken,
  generateRefreshToken,
};
