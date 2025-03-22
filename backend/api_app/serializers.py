from rest_framework import serializers
from api_app.models import QuizAttempt, Quiz

class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAttempt
        fields = ['user', 'quiz', 'score']

    def validate(self, data):
        # Custom validation logic can be added here
        return data
