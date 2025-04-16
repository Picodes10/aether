
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/types";
import { Clock, HelpCircle, Calendar } from "lucide-react";
import { format } from "date-fns";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
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
    <Card className="quiz-card quiz-card-hover h-full">
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
          <div className="flex flex-wrap gap-3 justify-between items-center border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center text-gray-500 text-sm">
              <HelpCircle className="h-4 w-4 mr-1" />
              <span>{quiz.questionCount} questions</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{quiz.timeLimit} min</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(new Date(quiz.createdAt), 'MMM d, yyyy')}</span>
            </div>
          </div>
          <div className="mt-6">
            <Link to={`/quiz/${quiz.id}`} className="quiz-button w-full justify-center inline-flex">
              Take Quiz
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
