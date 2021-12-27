from django.contrib.auth.models import User

from rest_framework import viewsets
from chat.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all().exclude(pk=self.request.user.pk)
