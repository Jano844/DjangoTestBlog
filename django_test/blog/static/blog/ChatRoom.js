
// Wenn Butten eines Chats gedrueckt wird, groupName ist die variabele des namens, welcher weitergegeben Wurde
document.querySelectorAll('#info_button').forEach(button => {
	button.addEventListener('click', function() {
		console.log("Info Button Pressed")
	});
});
