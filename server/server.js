'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

const {getState} = require('../query/get-state.js');

app.get('/', (req, res) => {
  res.send('Hello world!');
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('state-request', async (callback) => {
    const state = await getState('');
    callback(state);
  });
});

http.listen(port, () => console.log('Listening to port ', port));
