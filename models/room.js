const mongoose = require("mongoose");
// const { default: mongoose } = require("mongoose");

//Se ajustó el modelo de habitaciones a salas
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
  imgUrl: [],
}, {
  timestamps: true,
})
// const room = mongoose.model('room', roomSchema)
//Configuración para que mongo sólo agregue una colección de rooms
const Room = mongoose.model('Room', roomSchema, 'rooms');
module.exports = Room

