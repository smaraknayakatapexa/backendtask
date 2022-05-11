const router = require("express").Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyToken = require("../verifyToken");
//env config
dotenv.config();

router.post("/createUser", async (req, res) => {
  const users = await Users.findOne({
    username: req.body.username,
  });

  if (users) {
    res.status(200).send({
      status: 400,
      message: "user already exists",
    });
  } else {
    try {
      user = new Users({
        username: req.body.username,
        password: req.body.password,
      });

      await user.save();

      res.status(200).send({
        status: 200,
        message: "success",
      });
    } catch (e) {
      res.status(400).send({
        status: 400,
        message: e,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await Users.findOne({
    username: req.body.username,
  });

  if (!user) {
    res.status(200).send({
      status: 400,
      message: "user not found",
    });
  }
  if (req.body.password != user.password) {
    res.status(200).send({
      status: 400,
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.status(200).send({
    status: 200,
    message: "Login Successful",
    token: token,
  });
});

module.exports = router;
