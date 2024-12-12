const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/user");

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

  try {
    const user = await User.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });
    console.log("user", user);
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const temp = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id,
          };
          res.send(temp);
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

module.exports = router;
