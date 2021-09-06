const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log('DB connected')})

mongoose.connection.on('error', err => {
    console.log(`DB connection errors: ${err.message}`);
});

// bring in routes
const postRoutes = require('./routes/post');

/* const myOwnMiddleware = (req, res, next) => {
  console.log('middleware applied') ;
  next();
}; */

// middle ware
/* app.use(myOwnMiddleware); */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use('/', postRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`NodeJS API listening on PORT ${port}`)
});