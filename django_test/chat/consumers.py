from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Chat
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Hier kannst du auch noch Logik einfügen, um den Benutzer zu verbinden
        self.room_group_name = 'chat_room'  # Beispiel für ein Chatroom

        # Hinzufügen zum Room-Group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Entfernen vom Room-Group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Empfangen einer Nachricht von einem WebSocket-Client
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']  # Hier bekommst du den Benutzernamen aus der Nachricht


        print(message,"   " , username)
        # new_chat = Chat(message=message, author=username)
        # new_chat.save()
        # Nachricht an alle anderen WebSocket-Clients im Room senden
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username  # Hier sendest du den Benutzernamen mit
            }
        )

    # Empfang der Nachricht im Chat
    async def chat_message(self, event):
        message = event['message']
        username = event['username']  # Hier bekommst du den Benutzernamen aus der Nachricht

        # Sende die Nachricht an den WebSocket-Client
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username  # Der Benutzername wird hier mitgesendet
        }))