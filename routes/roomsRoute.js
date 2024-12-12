const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getAllrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
router.post("/getRoomById", async (req, res) => {
  const { roomId } = req.body;
  try {
    const room = await Room.findOne({ _id: roomId });
    return res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();

    res.send("Agregar nueva sala");
  } catch (error) {
    return res.status(400).jason({ error });
  }
});

//Obtener las salas más reservadas
router.get("/getTopRooms", async (req, res) => {
  try {
    const topRooms = await Room.aggregate([
      {
        $addFields: {
          totalReservations: { $size: "$currentBookings" },
        },
      },
      { $sort: { totalReservations: -1 } },
      { $limit: 5 }, // Obtiene las 5 salas más reservadas
    ]);

    res.send(topRooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
