from django.urls import path
from .views import InhabitantListView, InhabitantDetailView

urlpatterns = [
  path('', InhabitantListView.as_view()),
  path('<int:pk>/', InhabitantDetailView.as_view())
  ]