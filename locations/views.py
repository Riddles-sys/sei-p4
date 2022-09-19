from gc import get_objects
from http.client import HTTPResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from django.shortcuts import get_object_or_404
from .serializers.common import LocationSerializer
from .serializers.common import FavouriteSerializer
from .serializers.populated import PopulatedLocationFavourites, PopulatedLocationSerializer, PopulatedLocationDangerSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Location


# Create your views here.
# * All locations
class LocationListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, request):

    locations = Location.objects.all()
    print('locations -->', locations)
    serialized_locations = PopulatedLocationDangerSerializer(locations, many=True)
    print(serialized_locations.data)
    return Response(serialized_locations.data, status=status.HTTP_200_OK)

  def post(self, request):
    print('request data ->', request.data)
    location_to_add = LocationSerializer(data=request.data)
    try:
      location_to_add.is_valid(True)
      location_to_add.save()
      return Response(location_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('Error from news', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# * Detailed single location
class LocationDetailView(APIView):

  def get_location(self, pk):
    try:
      return Location.objects.get(pk=pk)
    except Location.DoesNotExist:
      raise NotFound(detail='Location not found')

  # Get single location
  def get(self, _request, pk):
      location = self.get_location(pk=pk)
      serialized_location = PopulatedLocationSerializer(location)
      return Response(serialized_location.data)

  # Delete single location
  def delete(self, request, pk):
    location_to_delete = self.get_location(pk=pk)
    location_to_delete.delete()
    print('location deleted')
    return Response(status=status.HTTP_204_NO_CONTENT)

  # Updating single location
  def put(self, request, pk):  
    location_to_update = self.get_location(pk=pk)
    updated_location = LocationSerializer(location_to_update, data=request.data)
    try: 
      updated_location.is_valid(True)
      updated_location.save()
      return Response(updated_location.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Likes
class LikesView(APIView):

  def get(self, request):

    likes = Location.objects.get(likes)
    print('reviews -->', likes)
    serialized_likes = LocationSerializer(likes, many=True)
    print(serialized_likes.data)
    return Response(serialized_likes.data, status=status.HTTP_200_OK)

  def post(self, request):
    like_to_create = LocationSerializer(data=request.data)

    try:
      like_to_create.is_valid(True)
      like_to_create.save()
      return Response(like_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  
  # def LocationLike(self, request, pk):
  #   post = get_object_or_404(Location, id=request.POST.get('location_id'))
  #   if post.likes.filter(id=request.user.id).exists():
  #     post.likes.remove(request.user)
  #   else: 
  #     post.likes.add(request.user)
  #   return Response(post.likes.data, status=status.HTTP_202_ACCEPTED)

class DislikesView(APIView):

  def LocationDislike(self, request, pk):
    post = get_object_or_404(Location, id=request.POST.get('location_id'))
    if post.dislikes.filter(id=request.user.id).exists():
      post.dislikes.remove(request.user)
    else: 
      post.dislikes.add(request.user)
    return Response(post.dislikes.data, status=status.HTTP_202_ACCEPTED)

# class FavouritesListView(APIView):
# # creating favourites
#   # permission_classes = (IsAuthenticatedOrReadOnly, )

#   def get(self, _request):

#     favourites = Location.objects.all()
#     print('favourites -->', favourites)
#     serialized_favourites = PopulatedLocationFavourites(favourites, many=True)
#     print('endpoint hit for favourites', serialized_favourites.data)
#     return Response(serialized_favourites.data, status=status.HTTP_200_OK)

  # def post(self, request):
  #   print('request data ->', request.data)
  #   favourites_to_add = PopulatedLocationFavourites(data=request.data)
  #   try:
  #     favourites_to_add.is_valid(True)
  #     favourites_to_add.save()
  #     return Response(favourites_to_add.data, status=status.HTTP_201_CREATED)
  #   except Exception as e:
  #     print('Error')
  #     return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class FavouritesListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly,)


  def get(self, _request):
    
    favourites = Location.objects.all()
    print('reviews -->', favourites)

    serialized_favourites = LocationSerializer(favourites, many=True)
    print(serialized_favourites.data)
    return Response(serialized_favourites.data, status=status.HTTP_200_OK)


  def post(self, request):
    
    print(request.user.id)
    print('requests', request.data)
    request.data['owner'] = request.user.id
    favourites_to_create = LocationSerializer(data=request.data)

    try:
      favourites_to_create.is_valid(True)
      favourites_to_create.save()
      return Response(favourites_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FavouritesDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_favourites(self, pk):
    try:
      return Location.objects.get(pk=pk)
    except Location.DoesNotExist:
      raise NotFound('Favourite not found')


  def delete(self, request, pk):
    favourite_to_delete = self.get_favourites(pk=pk)

    if favourite_to_delete.owner != request.user:
      raise PermissionDenied('Unauthorised Access')
    # print('Review owner ID --->', review_to_delete.owner)
    favourite_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


  def post(self, request):
    
    print(request.user.id)
    print('requests', request.data)
    request.data['owner'] = request.user.id
    favourite_to_create = LocationSerializer(data=request.data)
    try:
      favourite_to_create.is_valid(True)
      favourite_to_create.save()
      return Response(favourite_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)