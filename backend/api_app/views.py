from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api_app.models import QuizAttempt, Quiz
from api_app.serializers import QuizAttemptSerializer

class QuizAttemptView(APIView):
    def post(self, request):
        serializer = QuizAttemptSerializer(data=request.data)
        if serializer.is_valid():
            # Assuming the correct answers are stored in the Quiz model
            quiz = serializer.validated_data['quiz']
            user_answers = request.data.get('answers', {})
            correct_answers = quiz.correct_answers  # Assuming this field exists

            # Calculate score
            score = sum(1 for question, answer in user_answers.items() if correct_answers.get(question) == answer)

            # Save the quiz attempt
            quiz_attempt = QuizAttempt.objects.create(
                user=request.user,
                quiz=quiz,
                score=score
            )

            return Response({'score': score}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
