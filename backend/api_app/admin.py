from django.contrib import admin
from api_app.models import QuizAttempt, Leaderboard

# Register your models here.
admin.site.register(QuizAttempt)
admin.site.register(Leaderboard)
