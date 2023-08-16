from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
import requests
from rest_framework import status
from rest_framework.response import Response

from image.serializers import ImageSerializer, VirtualSerializer
from image.models import Image


class ImageViewSet(mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    # permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)


# 메이크업 뷰셋
class MakeupAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # 이미지를 업로드하고 DB에 저장
        serializer = VirtualSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # 업로드된 이미지와 받은 이미지의 URL
            uploaded_image_url = serializer.data['image']
            received_image_url = 'https://mon-palette.shop:8080/api/color/makeup/send/django' # 스프링부트에서 받은 이미지의 URL

            # 특정 API 호출
            api_url = "https://mon-palette.shop:8080/api/color/makeup/send/django"  # 호출할 API의 URL 설정
            data = {
                'uploaded_image_url': uploaded_image_url,
                'received_image_url': received_image_url,
            }

            response = requests.post(api_url, data=data)

            if response.status_code == status.HTTP_200_OK:
                return Response({'message': 'API call successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'API call failed'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

