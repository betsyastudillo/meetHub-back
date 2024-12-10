const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getAllrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.send(rooms)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


module.exports = router;