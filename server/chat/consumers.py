from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    user = None
    room_name = 'chats'
    room_group_name = None

    async def connect(self):
        self.room_name = '%s_%s' % (self.scope['url_route']['kwargs']['fromId'], self.scope['url_route']['kwargs']['toId'])
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'live_message',
                'chat_id': self.room_name,
                'data': text_data
            }
        )

    async def live_message(self, event):
        data = event['data']
        await self.send(text_data=data)

    async def websocket_disconnect(self, message):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


class StatusesConsumer(AsyncWebsocketConsumer):
    user = None
    room_name = 'statuses'
    room_group_name = None

    async def connect(self):
        self.room_group_name = f'online_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'online_status',
                'chat_id': self.room_name,
                'data': text_data
            }
        )

    async def online_status(self, event):
        data = event['data']
        await self.send(text_data=data)

    async def websocket_disconnect(self, message):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
