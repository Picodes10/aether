
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { mockQuizzes } from "@/data/mockData";
import { Clock, HelpCircle, Award } from "lucide-react";

const FeaturedQuizzes = () => {
  // Get 3 featured quizzes (we'll just use the first 3 for demo)
  const featuredQuizzes = mockQuizzes.slice(0, 3);

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
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-quiz-dark mb-4">Featured Quizzes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take on our most popular and challenging quizzes. Test your knowledge and
            see how you stack up against other quiz enthusiasts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="quiz-card quiz-card-hover h-full">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                  {quiz.imageUrl ? (
                    <img 
                      src={quiz.imageUrl} 
                      alt={quiz.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-quiz-gradient">
                      <HelpCircle className="h-16 w-16 text-white opacity-70" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{quiz.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-quiz-dark mb-3">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      <span>{quiz.questionCount} questions</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{quiz.timeLimit} min</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link to={`/quiz/${quiz.id}`} className="quiz-button w-full justify-center inline-flex">
                      Start Quiz
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/quizzes" className="quiz-button-secondary inline-flex items-center">
            View All Quizzes
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedQuizzes;
