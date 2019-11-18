'use strict';
import socketio from 'socket.io-client';
let socket = socketio('http://localhost:3000');
let paragraph = document.createElement('p');
let listContainer = document.createElement('div')
listContainer.id = "list-container"
paragraph.innerHTML = 'blaah';
document.body.appendChild(paragraph);
let getButton = document.createElement('button');
paragraph.innerHTML = 'GIT';
getButton.innerHTML = 'GIT!';
document.body.appendChild(getButton);

getButton.onclick = () => {
	socket.emit('state-request', (response) => {
	  paragraph.innerHTML = response;
	});
};

socket.on('connect', () => {
	socket.emit('get-printers', (printers) => {
		const ul = document.createElement('ul');

		printers.forEach((printer) => {
			let li = document.createElement('li');
			li.innerHTML = printer.ip;
			ul.appendChild(li);
		})
		listContainer.appendChild(ul);
		document.body.appendChild(listContainer);
	})
});
