
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuizzes } from "@/data/mockData";
import { Award, BookOpen, Clock, HelpCircle, Trophy, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuiz } from "@/context/QuizContext";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";

const QuizDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { loadQuiz, currentQuiz, startQuiz } = useQuiz();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadQuiz(id);
      setIsLoading(false);
    }
  }, [id, loadQuiz]);

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to take the quiz.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    startQuiz();
    navigate(`/quiz/${id}/take`);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center">
            <div className="animate-pulse w-full max-w-4xl">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!currentQuiz) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
            <p className="mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/quizzes")}>Browse Quizzes</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{currentQuiz.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(currentQuiz.difficulty)}`}>
                {currentQuiz.difficulty.charAt(0).toUpperCase() + currentQuiz.difficulty.slice(1)}
              </span>
              <span className="text-sm text-gray-500">{currentQuiz.category}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                Created {format(new Date(currentQuiz.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
            <p className="text-gray-600 text-lg">{currentQuiz.description}</p>
          </div>

          <div className="mb-10">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
              {currentQuiz.imageUrl ? (
                <img 
                  src={currentQuiz.imageUrl} 
                  alt={currentQuiz.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-quiz-gradient">
                  <BookOpen className="h-20 w-20 text-white opacity-70" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Questions</p>
                    <p className="text-xl font-bold">{currentQuiz.questionCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Limit</p>
                    <p className="text-xl font-bold">{currentQuiz.timeLimit} minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Trophy className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Points</p>
                    <p className="text-xl font-bold">{currentQuiz.questionCount * 10}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
              <CardDescription>Important details about this quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                  <p>{currentQuiz.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Difficulty</h3>
                  <p>{currentQuiz.difficulty.charAt(0).toUpperCase() + currentQuiz.difficulty.slice(1)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Created By</h3>
                  <p>Quiz Administrator</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date Added</h3>
                  <p>{format(new Date(currentQuiz.createdAt), 'MMMM d, yyyy')}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Button 
                className="bg-quiz-primary hover:bg-quiz-secondary text-white w-full max-w-xs"
                size="lg"
                onClick={handleStartQuiz}
              >
                Start Quiz
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Ready to Test Your Knowledge?</h2>
            <p className="text-gray-600 mb-6">
              This quiz contains {currentQuiz.questionCount} questions and you'll have {currentQuiz.timeLimit} minutes to complete it.
              Good luck!
            </p>
            <Button 
              className="bg-quiz-primary hover:bg-quiz-secondary text-white"
              size="lg"
              onClick={handleStartQuiz}
            >
              Start Quiz Now
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizDetailPage;
