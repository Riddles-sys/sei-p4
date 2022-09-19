from rest_framework import serializers
from ..models import Review
from better_profanity import profanity

class ReviewSerializer(serializers.ModelSerializer):

  class Meta:
    model = Review
    fields = '__all__'
    censored = profanity.censor(fields)