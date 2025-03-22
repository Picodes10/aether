from django.urls import path
from api_app.views import QuizAttemptView

urlpatterns = [
    path('submit-quiz/', QuizAttemptView.as_view(), name='submit-quiz'),
]
