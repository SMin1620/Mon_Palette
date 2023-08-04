from django.urls import path

from image.views import ImageViewSet, MakeupViewSet

personal_result = ImageViewSet.as_view({
    'post': 'create',
})

makeup_result = MakeupViewSet.as_view({
    'post': 'create'
})


urlpatterns = [
    path('', personal_result),
    path('/makeup', makeup_result),
]