
import { Link } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Award, Clock, Repeat, Trophy } from "lucide-react";
import confetti from 'canvas-confetti';
import { useEffect } from "react";

const QuizResults = () => {
  const { quizResult, currentQuiz, resetQuiz } = useQuiz();

  const scorePercentage = quizResult ? (quizResult.score / quizResult.maxScore) * 100 : 0;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Show celebration animation if score is good
  useEffect(() => {
    if (scorePercentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [scorePercentage]);

  if (!quizResult || !currentQuiz) return null;

  return (
    <div className="animate-bounce-in">
      <Card className="max-w-3xl mx-auto shadow-lg overflow-hidden">
        <CardHeader className="bg-quiz-gradient text-white text-center pb-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
            {scorePercentage >= 70 ? (
              <Trophy className="h-10 w-10 text-quiz-primary" />
            ) : scorePercentage >= 40 ? (
              <Award className="h-10 w-10 text-quiz-secondary" />
            ) : (
              <Clock className="h-10 w-10 text-gray-400" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold">{currentQuiz.title} - Results</CardTitle>
          <p className="text-white text-opacity-80 mt-2">
            {scorePercentage >= 80 ? "Excellent job!" : 
             scorePercentage >= 60 ? "Well done!" : 
             scorePercentage >= 40 ? "Good effort!" : 
             "Keep practicing!"}
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12 mb-8">
            <div className="text-center mb-6 md:mb-0">
              <div className="text-4xl font-bold text-quiz-primary mb-2">
                {quizResult.score}/{quizResult.maxScore}
              </div>
              <p className="text-gray-500">Points</p>
            </div>
            
            <div className="text-center mb-6 md:mb-0">
              <div className="text-4xl font-bold text-quiz-primary mb-2">
                {quizResult.correctAnswers}/{quizResult.totalQuestions}
              </div>
              <p className="text-gray-500">Correct Answers</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-quiz-primary mb-2">
                {formatTime(quizResult.timeTaken)}
              </div>
              <p className="text-gray-500">Time Taken</p>
            </div>
          </div>
          
          {/* Score meter */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Score</span>
              <span className="text-sm font-medium text-gray-500">{Math.round(scorePercentage)}%</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  scorePercentage >= 70 ? 'bg-green-500' : 
                  scorePercentage >= 40 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-700">
                Correct Answers: <span className="font-medium">{quizResult.correctAnswers}</span>
              </span>
            </div>
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-gray-700">
                Incorrect Answers: <span className="font-medium">{quizResult.totalQuestions - quizResult.correctAnswers}</span>
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                Average Time Per Question: <span className="font-medium">
                  {formatTime(Math.floor(quizResult.timeTaken / quizResult.totalQuestions))}
                </span>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              className="flex items-center justify-center"
              onClick={resetQuiz}
            >
              <Repeat className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Link to="/quizzes">
              <Button className="bg-quiz-primary hover:bg-quiz-secondary w-full sm:w-auto">
                Browse More Quizzes
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" className="w-full sm:w-auto">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;
