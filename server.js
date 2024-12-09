const express = require("express");

const app = express();

const dbConfing = require('./db')

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server Started using nodemon`));

