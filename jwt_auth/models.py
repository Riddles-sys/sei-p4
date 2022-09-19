
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  first_name = models.CharField(max_length=150, blank=True)
  last_name = models.CharField(max_length=150, blank=True)
  email = models.CharField(max_length=150, unique=True)
  profile_image = models.CharField(max_length=400, blank=True)
  bio = models.TextField(max_length=500, blank=True)