require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();

const dbConfing = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')

app.use(express.json());
app.use(cookieParser()); //Para los cookies

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server Started using nodemon`));

