function scrollToBottom() {
	const messagesDiv = document.getElementById('messages');
	if (messagesDiv) {
		messagesDiv.scrollTop = messagesDiv.scrollHeight;
	} else {
		console.error("Messages-Div nicht gefunden!");
	}
}

window.onload = scrollToBottom;

const chatData = document.querySelector("#chat-data");
if (!chatData) {
	console.error("Chat-Daten nicht gefunden!");
	throw new Error("Chat-Daten fehlen.");
}

const roomID = chatData.getAttribute("data-room-id");
const chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${roomID}/`);

chatSocket.onopen = function () {
	console.log("Die Verbindung wurde erfolgreich hergestellt!");
};

chatSocket.onclose = function () {
	console.log("Die Verbindung wurde unerwartet geschlossen.");
};

document.querySelector(".messageInput").focus();
document.querySelector(".messageInput").onkeyup = function (e) {
	if (e.keyCode === 13) {
		document.querySelector("#id_message_send_button").click();
	}
};


document.querySelector("#id_message_send_button").onclick = function () {
	console.log("HelloWorld")
	const messageInput = document.querySelector(".messageInput").value.trim();
	if (!messageInput) {
		console.warn("Leere Nachrichten können nicht gesendet werden.");
		return;
	}

	const username = chatData.getAttribute("data-username");
	const room_name = chatData.getAttribute("data-room-name");

	console.log("Username:", username);
	console.log("Message:", messageInput);
	console.log("Room Name:", room_name);
	console.log("Room ID:", roomID);

	chatSocket.send(JSON.stringify({
		message: messageInput,
		username: username,
		room_name: room_name,
		room_id: roomID,
	}));

	document.querySelector(".messageInput").value = "";
};


chatSocket.onmessage = function (e) {
	const data = JSON.parse(e.data);
	console.log("Empfangene Daten:", data);

	const username = chatData.getAttribute("data-username");
	const messageBoxDiv = document.createElement("div");

	messageBoxDiv.className = data.username === username ? "message-box-you" : "message-box-other";

	const messageBackgroundDiv = document.createElement("div");
	messageBackgroundDiv.className = "message-background";

	const authorParagraph = document.createElement("p");
	authorParagraph.className = "author";
	authorParagraph.textContent = data.username;

	const messageParagraph = document.createElement("p");
	messageParagraph.className = "message-text";
	messageParagraph.textContent = data.message;

	messageBackgroundDiv.appendChild(authorParagraph);
	messageBackgroundDiv.appendChild(messageParagraph);
	messageBoxDiv.appendChild(messageBackgroundDiv);

	const targetContainer = document.querySelector("#id_other_container");
	if (targetContainer) {
		targetContainer.appendChild(messageBoxDiv);
	} else {
		console.error("Ziel-Container nicht gefunden!");
	}

	scrollToBottom();
};



document.querySelector(".messageInput").focus();
document.querySelector(".messageInput").onkeyup = function (e) {
	if (e.keyCode === 13) {
		document.querySelector("#add_user_button").click();
	}
};

document.querySelector("#add_user_button").onclick = function () {
	console.log("HelloWorld")
	const messageInput = document.querySelector(".messageInput").value.trim();
	console.log("Input", messageInput)
	if (!messageInput) {
		console.warn("Leere Nachrichten können nicht gesendet werden.");
		return;
	}

	const username = chatData.getAttribute("data-username");
	const room_name = chatData.getAttribute("data-room-name");

	console.log("Username:", username);
	console.log("Message:", messageInput);
	console.log("Room Name:", room_name);
	console.log("Room ID:", roomID);

	// chatSocket.send(JSON.stringify({
	// 	message: messageInput,
	// 	username: username,
	// 	room_name: room_name,
	// 	room_id: roomID,
	// }));

	document.querySelector(".messageInput").value = "";
};