from .common import LocationSerializer, FavouriteSerializer
# from dangers.serializers.common import DangerSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from creatures.serializers.common import CreatureSerializer
from inhabitants.serializers.common import InhabitantSerializer
# from posts.serializers.common import PostSerializer
from jwt_auth.serializers.common import UserSerializer



class PopulatedLocationSerializer(LocationSerializer):
  reviews = PopulatedReviewSerializer(many=True)
  # dangers = DangerSerializer(many=True)
  creatures = CreatureSerializer(many=True)
  inhabitants = InhabitantSerializer(many=True)
  # posts = PostSerializer(many=True)
  # likes = UserSerializer(many=True)
  # dislikes = UserSerializer(many=True)
class PopulatedLocationDangerSerializer(LocationSerializer):
  # dangers = DangerSerializer(many=True)
  creatures = CreatureSerializer(many=True)
  inhabitants = InhabitantSerializer(many=True)
  # posts = PostSerializer(many=True)

class PopulatedLocationFavourites(LocationSerializer):
  favourites = FavouriteSerializer(many=True)
