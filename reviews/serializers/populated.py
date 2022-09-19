from .common import ReviewSerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedReviewSerializer(ReviewSerializer):
  owner = UserSerializer()
