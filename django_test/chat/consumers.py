from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Chat
from django.contrib.auth.models import User
import json
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'chat_room'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']

        # Speichere die Nachricht in der Datenbank
        await self.save_message(username, message)

        # Nachricht an die Gruppe senden
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        await self.send(text_data=json.dumps({
            'message': message,
            'username': username
        }))

    async def save_message(self, username, message):
        # Benutzer aus der Datenbank abrufen
        user = await sync_to_async(User.objects.get)(username=username)

        # Nachricht in der Datenbank speichern
        await sync_to_async(Chat.objects.create)(
            message=message,
            author=user
        )
