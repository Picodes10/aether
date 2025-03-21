from django.test import TestCase
from api_app.models import QuizAttempt, Leaderboard
from django.contrib.auth.models import User

class QuizAttemptModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.quiz_attempt = QuizAttempt.objects.create(user=self.user, quiz_id=1, score=85)

    def test_quiz_attempt_creation(self):
        self.assertEqual(self.quiz_attempt.user.username, 'testuser')
        self.assertEqual(self.quiz_attempt.score, 85)

class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.leaderboard_entry = Leaderboard.objects.create(user=self.user, quiz_id=1, rank=1, score=100)

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard_entry.user.username, 'testuser')
        self.assertEqual(self.leaderboard_entry.rank, 1)
        self.assertEqual(self.leaderboard_entry.score, 100)
