from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, default='patient')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []