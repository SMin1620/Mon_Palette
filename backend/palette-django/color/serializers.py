from rest_framework import serializers

from color.models import Color


class ColorSerializer(serializers.ModelSerializer):
    """
    컬러 시리얼라이저
    """
    class Meta:
        model = Color
        fields = [
            'id',
            'name'
        ]

