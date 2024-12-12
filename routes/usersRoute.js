const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");

const verifyToken = require("../utils/verifyToken");

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  console.log("new", newuser);
  try {
    const user = await newuser.save();
    res.send("Usuario registrado exitosamente");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(process.env.JWT_KEY);

  try {
    const user = await User.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });
    console.log("user", user);
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            {
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              _id: user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
          );
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
          res.send({
            message: "Success!",
            user: {
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              _id: user._id,
            },
          });
        } else {
          res.status(404).json("La contraseña es incorrecta", err);
        }
      });
    } else {
      return res.status(400).json({ message: "Login inválido" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getAllusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/home", verifyToken, (req, res) => {
  const profile = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  };
  res.json({ message: "Success!", profile });
});

module.exports = router;
