from rest_framework import serializers

from image.models import Image
from image.personal_color_analysis import personal_color


# 퍼스널 컬러 시리얼라이저
class ImageSerializer(serializers.ModelSerializer):
    personal = serializers.SerializerMethodField('get_personal')
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Image
        fields = [
            'image',
            'personal'
        ]

    def get_personal(self, obj):
        request = self.context.get("request")
        get_image = request.build_absolute_uri(obj.image.url)
        return personal_color.analysis(get_image)


# 가상 메이크업 시리얼라이저
class VirtualSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    makeup = serializers.SerializerMethodField('get_makeup')

    class Meta:
        model = Image
        fields = [
            'image',
            'makeup'
        ]

    def get_makeup(self, obj):
        pass



