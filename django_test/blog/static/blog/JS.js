function scrollToBottom() {
	var messagesDiv = document.getElementById('messages');
	messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
window.onload = scrollToBottom;


const chatSocket = new WebSocket("ws://" + window.location.host + "/");
chatSocket.onopen = function (e) {
  console.log("The connection was setup successfully !");
};
chatSocket.onclose = function (e) {
  console.log("Something unexpected happened !");
};
document.querySelector("#id_message_send_input").focus();
document.querySelector("#id_message_send_input").onkeyup = function (e) {
  if (e.keyCode == 13) {
	document.querySelector("#id_message_send_button").click();
  }
};

document.querySelector("#id_message_send_button").onclick = function (e)
{
	var messageInput = document.querySelector("#id_message_send_input").value;
	var username = document.querySelector("#chat-data").getAttribute("data-username");

	console.log("Username:", username);
	chatSocket.send(JSON.stringify({ message: messageInput, username: username }));
};


chatSocket.onmessage = function (e)
{
const data = JSON.parse(e.data);

console.log("Received data:", data);

// Neues Haupt-Div für die Nachricht erstellen
var username = document.querySelector("#chat-data").getAttribute("data-username");
var messageBoxDiv = document.createElement("div");

if (data.username == username)
  messageBoxDiv.className = "message-box-you";
else
  messageBoxDiv.className = "message-box-other"

// messageBoxDiv.className = "message-box-you";

// Inneres Hintergrund-Div erstellen
var messageBackgroundDiv = document.createElement("div");
messageBackgroundDiv.className = "message-background";

// Author-Element erstellen
var authorParagraph = document.createElement("p");
authorParagraph.className = "author";
authorParagraph.textContent = data.username;

// Nachrichten-Text-Element erstellen
var messageParagraph = document.createElement("p");
messageParagraph.className = "message-text";
messageParagraph.textContent = data.message;

// Elemente verschachteln
messageBackgroundDiv.appendChild(authorParagraph);
messageBackgroundDiv.appendChild(messageParagraph);
messageBoxDiv.appendChild(messageBackgroundDiv);

// Nachrichteneingabe leeren
document.querySelector("#id_message_send_input").value = "";

// Nachricht in ein anderes Ziel-Div hinzufügen
const targetContainer = document.querySelector("#id_other_container"); // ID des gewünschten Containers
if (targetContainer) {
	  targetContainer.appendChild(messageBoxDiv);
  } else {
	  console.error("Ziel-Container nicht gefunden!");
}
scrollToBottom();
};