from rest_framework import routers
from chat import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)


urlpatterns = router.urls
