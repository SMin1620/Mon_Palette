from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from image.serializers import ImageSerializer, VirtualSerializer
from color.models import Color


class ImageViewSet(mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    queryset = Color.objects.all()
    serializer_class = ImageSerializer
    # permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)


# 메이크업 뷰셋
class MakeupViewSet(mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    queryset = Color.objects.all()
    serializer_class = VirtualSerializer
    parser_classes = (MultiPartParser, FormParser)

