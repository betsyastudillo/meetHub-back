const  mongoose  = require("mongoose");

var mongoURL = 'mongodb+srv://mayra:m1234m@cluster0.wavop.mongodb.net/room'

mongoose.connect(mongoURL , {useUnifiedTopology : true ,  useNewUrIParsert:true})

var connection = mongoose.connection

connection.on('error' , () =>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected' , () => {
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose