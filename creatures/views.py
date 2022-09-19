from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Creature
from rest_framework import status

from .serializers.common import CreatureSerializer


# Create your views here.

class CreatureListView(APIView):
#* Get all reviews
  def get(self, request):

    creatures = Creature.objects.all()
    print('creatures -->', creatures)
    serialized_creatures = CreatureSerializer(creatures, many=True)
    print(serialized_creatures.data)
    return Response(serialized_creatures.data, status=status.HTTP_200_OK)

class CreaturesDetailView(APIView):

  def get_Creature(self, pk):
    try:
      return Creature.objects.get(pk=pk)
    except Creature.DoesNotExist:
      raise NotFound(detail='Location not found')

  # Get single location
  def get(self, _request, pk):
      Creature = self.get_Creature(pk=pk)
      serialized_Creature = CreatureSerializer(Creature)
      return Response(serialized_Creature.data)