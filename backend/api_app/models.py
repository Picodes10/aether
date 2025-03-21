from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
    # Assuming a Quiz model exists with necessary fields
    title = models.CharField(max_length=255)
    # Add other fields as necessary

class QuizAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    rank = models.IntegerField()
    score = models.IntegerField()
