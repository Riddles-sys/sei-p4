from django.db import models

# Create your models here.
class Review(models.Model):
  text = models.TextField(max_length=250)
  created_at = models.DateTimeField(auto_now_add=True)
  location = models.ForeignKey(
    'locations.Location',
    related_name = 'reviews',
    on_delete = models.CASCADE
  )

  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name = 'reviews',
    on_delete = models.CASCADE
  )