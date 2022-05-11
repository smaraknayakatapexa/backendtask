const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      status: 401,
      message: "Access Denied!",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(200).send({
      status: 404,
      message: "Session expired! Login to continue",
    });
  }
};
