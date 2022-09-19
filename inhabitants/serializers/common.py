from rest_framework import serializers
from ..models import Inhabitant

class InhabitantSerializer(serializers.ModelSerializer):

  class Meta:
    model = Inhabitant
    fields = '__all__'
