from django.urls import path

# from ..favourites.views import Favourite
from .views import RegisterView, LoginView, UserProfile, EditProfile

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('profile/', UserProfile.as_view()),
  path('profile/<int:pk>/', EditProfile.as_view())
  # path('favourites/', Favourite.as_view())
  # path('change_password/<int:pk>/', ChangePasswordView.as_view())
]