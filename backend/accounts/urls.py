
from django.urls import path
from .views import CustomTokenView, RegisterView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    #path('login/', TokenObtainPairView.as_view()),
    #path('login/', CustomTokenView.as_view()),

    #path('refresh/', TokenRefreshView.as_view()),

    path("login/", MyTokenObtainPairView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    
]








