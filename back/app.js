const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const router = require("./routes")
const axios = require("axios");
const qs = require('qs')
const config = require('./config')
const BadRequest = config.exception.BadRequest;


app.use(
    cors({
      origin: ['https://mgmarket.store', 'https://www.mgmarket.store', 'http://127.0.0.1:3000', 'http://127.0.0.1:3005', 'http://localhost:3000', 'http://localhost:3005'],
      credentials: true,
    })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.static('uploads'))
app.use(router)

app.use((error, req, res, next) => {
  // console.log(error.message)
    if (error instanceof BadRequest) {
      res.json({
        isError: true,
        message: error.message,
        status: error.status,
      });
    } else if (error instanceof Error) {
      res.json({
        isError: true,
        message: error.message,
      });
    }
  });
module.exports = app