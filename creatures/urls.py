from django.urls import path
from .views import CreatureListView, CreaturesDetailView

urlpatterns = [
  path('', CreatureListView.as_view()),
  path('<int:pk>/', CreaturesDetailView.as_view())
]