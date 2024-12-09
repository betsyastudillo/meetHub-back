const mongose = require("");
const { default: mongoose } = require("mongoose");

const roomSchema = mongoose.Schema({  //revisar esta parte 
  name: {
    type: String,
    required: true,
  },
  maxcount: {
    type: Number,
    required: true,
  },
  imageurls: [],
  currentbookings: [],
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }

})
const roomModel = mongoose.model('rooms', roomSchema)

module.export = roomModel

