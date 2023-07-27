from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated

from color.serializers import ColorSerializer
from color.models import Color


class ColorListDetailViewSet(mixins.ListModelMixin,
                             mixins.RetrieveModelMixin,
                             viewsets.GenericViewSet):
    """
    컬러 조회
    """
    lookup_url_kwarg = 'color_id'

    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    # permission_classes = [IsAuthenticated]

