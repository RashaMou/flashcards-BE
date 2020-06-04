const Auth = require("../database/models/users-model");

module.exports = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json("Please provide an email, name, and password");
  } else {
    Auth.findBy({ email })
      .first()
      .then((user) => {
        if (user) {
          res
            .status(400)
            .json("That email already exists. Please login again.");
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(500).json("Error registering user");
      });
  }
};
