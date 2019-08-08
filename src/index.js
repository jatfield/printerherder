'use strict'
import socketio from 'socket.io-client';
let socket = socketio('http://localhost:3000');
let paragraph = document.createElement("p");
paragraph.innerHTML = 'blaah';
document.body.appendChild(paragraph);
let getButton = document.createElement("button");
paragraph.innerHTML = 'GIT';
getButton.innerHTML = 'GIT!';
document.body.appendChild(getButton);

getButton.onclick = () => {
	socket.emit('state-request', (response) => {
	  paragraph.innerHTML = response;
	});
};
