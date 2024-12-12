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

//Actualizar sala
router.put('/updateRoom/:id', async (req, res) => {
  const { id } = req.params;
  const roomUpdate = await Room.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  )
  if (!roomUpdate) return res.status(404).send("No se encontró la sala");
  const roomUpdated = await roomUpdate.save();
  res.send(roomUpdated);
});
//Eliminar sala
router.delete('/deleteRoom/:id', async (req, res) => {
  const { id } = req.params;
  const roomdelete = await Room.findOneAndDelete({_id: id})
  if (!roomdelete) return res.status(404).send("No se encontró la sala");
  res.send('Sala eliminada exitosamente');
})
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
