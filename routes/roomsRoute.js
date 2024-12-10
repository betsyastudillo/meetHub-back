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
router.post("/getRoomById", async (req, res) => {
  const { roomId } = req.body;
  try {
    const room = await Room.findOne({_id: roomId});
    return res.send(room)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


module.exports = router;