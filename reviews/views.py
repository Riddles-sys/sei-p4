from distutils.log import error
from urllib import request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import ReviewSerializer
from .serializers.populated import PopulatedReviewSerializer
from jwt_auth.serializers.common import UserSerializer
from .models import Review

# Create your views here.
class ReviewListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly,)


  def get(self, _request):
    
    reviews = Review.objects.all()
    print('reviews -->', reviews)

    serialized_reviews = ReviewSerializer(reviews, many=True)
    print(serialized_reviews.data)
    return Response(serialized_reviews.data, status=status.HTTP_200_OK)



  def post(self, request):
    
    print(request.user.id)
    print('requests', request.data)
    request.data['owner'] = request.user.id
    review_to_create = ReviewSerializer(data=request.data)

    try:
      review_to_create.is_valid(True)
      review_to_create.save()
      return Response(review_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)



#* Single Review
class ReviewDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_review(self, pk):
    try:
      return Review.objects.get(pk=pk)
    except Review.DoesNotExist:
      raise NotFound('Review not found')

  def delete(self, request, pk):
    review_to_delete = self.get_review(pk=pk)

    if review_to_delete.owner != request.user:
      raise PermissionDenied('Unauthorised Access')
    # print('Review owner ID --->', review_to_delete.owner)
    review_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk, format=None):
      review_to_edit = self.get_review(pk)
      request.data['owner'] = request.user.id
      review_to_update = ReviewSerializer(review_to_edit, data=request.data)
      if review_to_update.is_valid():
        review_to_update.save()
        return Response(review_to_update.data, status=status.HTTP_201_CREATED)
      print('error review to update ----------->', review_to_update.errors)
      return Response(review_to_update.errors, status=status.HTTP_400_BAD_REQUEST)



