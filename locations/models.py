from django.db import models
from django.contrib.postgres.fields import ArrayField

# import favourites

# Create your models here.
class Location(models.Model):
  name = models.CharField(max_length=150, default=None)
  history = models.CharField(max_length=1000, default=None)
  trivia = models.CharField(max_length=200, default=None)
  location_image_1 = models.CharField(max_length=300, default=None)
  location_image_2 = models.CharField(max_length=300, default=None)
  location_image_3 = models.CharField(max_length=300, default=None)
  youtube_id = models.CharField(max_length=100, default=None)
  danger_choices = (
  ('Low Risk', 'Low Risk'),
  ('Medium Risk', 'Medium Risk'),
  ('High Risk', 'High Risk')
)
  risk = models.CharField(max_length=100, blank=True, choices = danger_choices)

  # dangers = models.ManyToManyField(
  #   'dangers.Danger',
  #   related_name = 'locations',
  # )
  # favourites = models.ManyToManyField(
  #   'jwt_auth.User',
  #   related_name = 'favourite',
  #   default = None, 
  #   blank = True
  # )

  likes = models.ManyToManyField(
    'jwt_auth.User', 
    blank=True, 
    related_name = 'location_like'
    )

  dislikes = models.ManyToManyField(
    'jwt_auth.User', 
    blank=True, 
    related_name = 'location_dislike'
    )

  favourites = models.ManyToManyField(
    'jwt_auth.User', 
    blank=True, 
    related_name = 'favourites'
    )

  creatures = models.ManyToManyField(
    'creatures.Creature',
    blank=True,
    related_name='creatures'
  )

  inhabitants = models.ManyToManyField(
    'inhabitants.Inhabitant',
    blank=True,
    related_name='inhabitants'
  )


#* This is the one that shows up on the db folder
  def __str__(self):
    return f'{self.name}'

