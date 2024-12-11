const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");


router.post("/bookroom", async (req, res) => {
    const { room,
        userId,
        fromDate,
        toDate,
        totalDays } = req.boby

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._Id,
            userId,
            fromDate: moment(fromDate).format('DD-MM-YYYY'),
            toDate: moment(toDate).format('DD-MM-YYYY'),
            totalDays,
            transactionId
        })

        const booking = await newbooking.save()

        const roomtemp = await Room.findOne({ _id: room._id })

        roomtemp.currentbookings.push({ 
            bookingid: booking._id, 
            fromDate: moment(fromDate).format('DD-MM-YYYY'), 
            toDate: moment(toDate).format('DD-MM-YYYY'),
            userId : userId,
            status : booking.status
        });

        await roomtemp.save()

        res.send('Room Booked Successfully')

    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
