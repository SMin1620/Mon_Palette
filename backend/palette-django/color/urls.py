from django.urls import path

from color.views import (
    ColorListDetailViewSet,
)


color_list = ColorListDetailViewSet.as_view({
    'get': 'list'
})

color_detail = ColorListDetailViewSet.as_view({
    'get': 'retrieve'
})


urlpatterns = [
    path('', color_list),
    path('<int:color_id>/', color_detail),
]