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
      fromDate,
      toDate,
      totalDays,
      transactionId: '1234'
    })

    const booking = await newbooking.save()

    const roomtemp = await Room.findOne({ _id: room._id })

    roomtemp.currentBookings.push({ 
      bookingId: booking._id, 
      fromDate, 
      toDate,
      userId : userId,
      status : booking.status
    });

    await roomtemp.save()

    res.send('Sala reservada exitosamente');

  } catch (error) {
      return res.status(400).json({ error });
  }
});

router.post("/getBookingsByUserId", async (req, res) => {
  console.log("Request received:", req.body); // Log para verificar el cuerpo de la solicitud

  const userId = req.body.userId;
  
  try {
    const bookings = await Booking.find({ userId: userId });
    console.log("Bookings found:", bookings); // Log para verificar las reservas encontradas

    res.send(bookings); // Enviar las reservas encontradas
  } catch (error) {
    return res.status(400).json({ error }); // Enviar error si ocurre un problema
  }
});

router.post('/cancelBooking', async(req, res) => {
  const { bookingId, roomId} = req.body;
  try {
    const bookingItem = await Booking.findOne({_id: bookingId});
    bookingItem.status = 'cancelled';

    await bookingItem.save();

    const room = await Room.findOne({_id: roomId});
    const bookings = room.currentBookings;

    const temp = bookings.filter(booking => booking.bookingId.toString() !== bookingId)
    room.currentBookings = temp;

    await room.save();

    res.send('Reserva cancelada exitosamente');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/getAllBookings', async(req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
