from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from chat import consumers

application = ProtocolTypeRouter({
    'websocket':
        URLRouter([
            path('chat/send/<int:fromId>/<int:toId>', consumers.ChatConsumer.as_asgi()),
            path('chat/receive/<int:fromId>/<int:toId>', consumers.ChatConsumer.as_asgi()),
            path('user-statuses', consumers.StatusesConsumer.as_asgi()),
        ])
})

