from django.urls import path

from image.views import ImageViewSet


image_result = ImageViewSet.as_view({
    'post': 'create',
})


urlpatterns = [
    path('', image_result)
]