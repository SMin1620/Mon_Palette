from django.urls import path
from rest_framework.routers import DefaultRouter

from image.views import ImageViewSet, MakeupAPIView

personal_result = ImageViewSet.as_view({
    'post': 'create',
})

# makeup_result = MakeupAPIView.as_view({
#     'post': 'create'
# })

# # ViewSet용 Router 생성
# router = DefaultRouter()
# router.register(r'', ImageViewSet, basename='image')


urlpatterns = [
    path('', personal_result),
    path('makeup', MakeupAPIView.as_view()),
]