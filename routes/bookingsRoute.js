const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const { room,
    userId,
    fromDate,
    toDate,
    totalDays } = req.body

  try {
    const newbooking = new Booking({
      room: room.name,
      roomId: room._id,
      userId,
      fromDate: moment(fromDate).format('DD-MM-YYYY'),
      toDate:  moment(toDate).format('DD-MM-YYYY'),
      totalDays,
      transactionId: '1234'
    })

    const booking = await newbooking.save()

    const roomtemp = await Room.findOne({ _id: room._id })

    roomtemp.currentBookings.push({ 
      bookingId: booking._id, 
      fromDate: moment(fromDate).format('DD-MM-YYYY'), 
      toDate: moment(toDate).format('DD-MM-YYYY'),
      userId : userId,
      status : booking.status
    });

    await roomtemp.save()

    res.send('Sala reservada exitosamente');

  } catch (error) {
      return res.status(400).json({ error });
  }
});

module.exports = router;
