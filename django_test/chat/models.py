
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class Chat(models.Model):
    message = models.CharField(max_length=255)
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author.username}: {self.message}"