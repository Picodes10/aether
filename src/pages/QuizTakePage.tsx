
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/Quiz/QuizQuestion";
import QuizTimer from "@/components/Quiz/QuizTimer";
import QuizResults from "@/components/Quiz/QuizResults";
import { useQuiz } from "@/context/QuizContext";
import { AlertTriangle } from "lucide-react";

const QuizTakePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    currentQuiz, 
    currentQuestion, 
    currentQuestionIndex,
    quizAttempt,
    isQuizCompleted,
    loadQuiz, 
    startQuiz, 
    submitQuiz
  } = useQuiz();

  useEffect(() => {
    if (id && (!currentQuiz || currentQuiz.id !== id)) {
      loadQuiz(id);
    }
  }, [id, currentQuiz, loadQuiz]);

  // Redirect if no quiz is loaded
  if (!currentQuiz) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <p className="mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/quizzes")}>Browse Quizzes</Button>
        </div>
      </MainLayout>
    );
  }

  // Show quiz results if completed
  if (isQuizCompleted) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <QuizResults />
        </div>
      </MainLayout>
    );
  }

  // Show quiz intro if not started
  if (!quizAttempt) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-quiz-gradient text-white text-center">
              <CardTitle className="text-2xl font-bold">{currentQuiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                  <p className="text-gray-600">
                    This quiz contains {currentQuiz.questionCount} questions and you have {currentQuiz.timeLimit} minutes to complete it.
                    Each question is worth 10 points. Your score will be calculated based on the number of correct answers.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Tips</h3>
                  <ul className="list-disc pl-5 text-blue-700 space-y-1">
                    <li>Read each question carefully before answering</li>
                    <li>You can navigate between questions using the Previous and Next buttons</li>
                    <li>The timer starts as soon as you begin the quiz</li>
                    <li>Your progress is saved as you go</li>
                  </ul>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    className="bg-quiz-primary hover:bg-quiz-secondary text-white"
                    size="lg"
                    onClick={startQuiz}
                  >
                    Begin Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  // Show quiz questions
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <QuizTimer />
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-8">
              {currentQuestion ? (
                <QuizQuestion 
                  question={currentQuestion}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={currentQuiz.questionCount}
                />
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">No questions available</h3>
                  <p className="text-gray-500 mb-4">There seems to be an issue with this quiz.</p>
                  <Button onClick={() => navigate("/quizzes")}>
                    Return to Quizzes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              onClick={submitQuiz}
            >
              End Quiz and Submit Answers
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizTakePage;
