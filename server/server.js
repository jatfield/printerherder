'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;
const db = require('../store/db');
const ObjectId = require('mongodb').ObjectID;
const Printer = require('../store/models/printers.js');
const {getState} = require('../query/get-state.js');
const {getCounts} = require('../query/get-counts.js');
const getPrinter = () => {
  return new Promise((resolve, reject) => {
    Printer.findById(new ObjectId("5d8b9fed586d9b7057eef9e8")).exec((error, printerDocument) => {
      if (error) {
        reject(error);
      } else {
        console.log(printerDocument);
        resolve(printerDocument);
      }
    });
  });
};

const getPrinters = () => {
  const Printer = require('../store/models/printers.js');
  return new Promise((resolve, reject) => {
    Printer.find({}, (error, printerDocuments) => {
      if (error) {
        reject(error);
      } else {
        console.log(printerDocuments.length);
        resolve(printerDocuments);
      }
    });
  });
};

setInterval(async () => {
  const counters = await getCounts();
  console.log(counters);
}, 5000);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('state-request', async (callback) => {
    let state;
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

  socket.on('get-printers', async (callback) => {
    let printers;
    try {
      printers = await getPrinters();
    } catch (error) {
      console.log(error);
    } finally {
      callback(printers);
    }
  });
});

http.listen(port, () => console.log('Listening to port ', port));
