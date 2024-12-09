const mongoose = require("");
const { default: mongoose } = require("mongoose");

const roomSchema = mongoose.Schema({  //revisar esta parte 
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Activa', 'Inactiva']
  },
  location: {
    type: String,
    required: true,
  },
  currentBookings: [],
  imgUrl: []
})
const roomModel = mongoose.model('rooms', roomSchema)

module.export = roomModel

