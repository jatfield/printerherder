'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

io.on('connection', (socket) => {
  console.log('Client connected');
});

http.listen(port, () => console.log('Listening to port ', port));
