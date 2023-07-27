from rest_framework import serializers

from image.models import Image
from image.personal_color_analysis import personal_color


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



