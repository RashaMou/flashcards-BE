const configSecret = require('../config/secret');
const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const payload = {
    name: user.name,
  };

  const secret = configSecret.jwtSecret;

  const options = {
    expiresIn: '24h',
  };

  return jwt.sign(payload, secret, options);
};
