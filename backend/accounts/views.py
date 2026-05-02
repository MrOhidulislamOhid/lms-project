from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenSerializer
from .serializers import MyTokenObtainPairSerializer
from rest_framework.response import Response


# Create your views here.




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.user
        token = serializer.validated_data

        return Response({
            "access": token["access"],
            "refresh": token["refresh"],
            "role": user.role,        # 🔥 IMPORTANT
            "username": user.username
        })





class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer




