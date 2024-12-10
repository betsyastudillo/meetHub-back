const express = require("express");

const app = express();

const dbConfing = require('./db')
const roomsRoute = require('./routes/roomsRoute')

app.use(express.json());
app.use('/api/rooms', roomsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server Started using nodemon`));

