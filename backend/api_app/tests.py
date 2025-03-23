from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from api_app.models import Quiz, QuizAttempt
from django.contrib.auth.models import User

class QuizAttemptViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.quiz = Quiz.objects.create(title='Sample Quiz', correct_answers={"q1": "a", "q2": "b"})
        self.client.force_authenticate(user=self.user)

    def test_submit_quiz_attempt(self):
        response = self.client.post('/api/submit-quiz/', {
            'quiz': self.quiz.id,
            'answers': {
                'q1': 'a',
                'q2': 'b'
            }
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['score'], 2)

    def test_submit_quiz_attempt_invalid_answers(self):
        response = self.client.post('/api/submit-quiz/', {
            'quiz': self.quiz.id,
            'answers': {
                'q1': 'c',
                'q2': 'b'
            }
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['score'], 1)

    def test_submit_quiz_attempt_no_answers(self):
        response = self.client.post('/api/submit-quiz/', {
            'quiz': self.quiz.id,
            'answers': {}
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['score'], 0)
