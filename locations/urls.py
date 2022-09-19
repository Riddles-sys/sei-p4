from django.urls import path
from .views import LocationListView, LocationDetailView, LikesView, DislikesView, FavouritesListView, FavouritesDetailView

urlpatterns = [
  path('', LocationListView.as_view()),
  path('<int:pk>/', LocationDetailView.as_view()),
  path('location_likes/', LikesView.as_view()),
  # path('location_dislikes/', DislikesView.as_view())
  path('favourites/', FavouritesListView.as_view()),
  path('favourites/<int:pk>', FavouritesDetailView.as_view())

]

