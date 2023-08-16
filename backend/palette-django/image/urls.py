from django.urls import path
from rest_framework.routers import DefaultRouter

from image.views import ImageViewSet, MakeupAPIView

personal_result = ImageViewSet.as_view({
    'post': 'create',
})


urlpatterns = [
    path('', personal_result),
    path('makeup', MakeupAPIView.as_view()),
]