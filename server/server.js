'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;
const db = require('../store/db');
const ObjectId = require('mongodb').ObjectID;

const {getState} = require('../query/get-state.js');
const getPrinter = () => {
  const Printer = require('../store/models/printers.js');
  return new Promise((resolve, reject) => {
    Printer.findById(new ObjectId("5d4c6ae3f41fdc34776a60e6")).exec((error, printerDocument) => {
      if (error) {
        reject(error);
      } else {
        console.log(printerDocument);
        resolve(printerDocument);
      }
    });
  });
}


app.get('/', (req, res) => {
  res.send('Hello world!');
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('state-request', async (callback) => {
    let state
    try {
      const printer = await getPrinter();
      console.log(printer);
      state = await getState(printer.ip);
    } catch(error) {
      console.log(error);
      state = error;
    } finally {
      callback(state);
    }
  });
});

http.listen(port, () => console.log('Listening to port ', port));
