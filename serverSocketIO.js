'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./server/comments');
const User = require('./server/user');
const port = process.env.API_PORT || 3001;
const app = express();
// const router = express.Router();
// var server = require('http').createServer();
var io = require('socket.io')();

//SOCKET IO  
io.listen('3002');
console.log('io listening on port 3002')
io.on('connection', (client) => {

  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  })

  client.on('emitLogin', (data) => {
    console.log('emited login', data)
  })
})

//db config
var mongoDB = 'mongodb://localhost:27017/react-chat';
//fix deprecation warning
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));