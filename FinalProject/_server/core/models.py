from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    score = models.IntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
