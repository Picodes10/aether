
import { useEffect, useState } from "react";
import { Question } from "@/types";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  showFeedback?: boolean;
}

const QuizQuestion = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  showFeedback = false 
}: QuizQuestionProps) => {
  const { 
    quizAttempt, 
    selectAnswer, 
    nextQuestion, 
    previousQuestion, 
    submitQuiz 
  } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [animation, setAnimation] = useState("");

  // Find if user already answered this question
  useEffect(() => {
    if (quizAttempt) {
      const existingAnswer = quizAttempt.answers.find(
        (a) => a.questionId === question.id
      );
      if (existingAnswer) {
        setSelectedOption(existingAnswer.selectedOptionId);
      } else {
        setSelectedOption(null);
      }
    }
  }, [quizAttempt, question.id]);

  // Add entrance animation
  useEffect(() => {
    setAnimation("animate-fade-in");
    const timer = setTimeout(() => setAnimation(""), 500);
    return () => clearTimeout(timer);
  }, [question.id]);

  const handleSelectOption = (optionId: string) => {
    if (!showFeedback) {
      setSelectedOption(optionId);
      selectAnswer(question.id, optionId);
    }
  };

  const getOptionClasses = (optionId: string) => {
    let classes = "answer-option";
    
    if (selectedOption === optionId) {
      classes += " selected-answer";
    }
    
    if (showFeedback) {
      if (optionId === question.correctOptionId) {
        classes += " correct-answer";
      } else if (selectedOption === optionId && optionId !== question.correctOptionId) {
        classes += " incorrect-answer";
      }
    }
    
    return classes;
  };

  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <div className={`space-y-6 ${animation}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-quiz-primary">
          {question.points} points
        </span>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        ></div>
      </div>

      <div className="pt-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              className={getOptionClasses(option.id)}
              disabled={showFeedback}
            >
              <div className="flex justify-between items-center">
                <span>{option.text}</span>
                {showFeedback && option.id === question.correctOptionId && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {showFeedback && selectedOption === option.id && option.id !== question.correctOptionId && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Explanation:</span> {question.explanation}
            </p>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={questionNumber === 1}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button 
              onClick={submitQuiz}
              disabled={!selectedOption || showFeedback}
              className="bg-quiz-primary hover:bg-quiz-secondary"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!selectedOption && !showFeedback}
              className="bg-quiz-primary hover:bg-quiz-secondary flex items-center"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
