'use strict'
import socketio from 'socket.io-client';
let socket = socketio('http://localhost:3000');
let paragraph = document.createElement("p");
paragraph.innerHTML = 'blaah';
document.body.appendChild(paragraph);
