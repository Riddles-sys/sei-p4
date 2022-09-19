from dataclasses import fields
from rest_framework import serializers
from ..models import Location
# from ..models.Location import likes


# Serializer for Locations
class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'


class FavouriteSerializer(serializers.ModelSerializer):

  class Meta:
    model = Location
    fields = ( 'favourites', )