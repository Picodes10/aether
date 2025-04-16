
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Question, Quiz, QuizAttempt, QuizResult, UserAnswer } from "@/types";
import { mockQuestions, mockQuizzes } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";

interface QuizContextType {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  quizAttempt: QuizAttempt | null;
  isQuizCompleted: boolean;
  quizResult: QuizResult | null;
  remainingTime: number;
  loadQuiz: (quizId: string) => void;
  startQuiz: () => void;
  selectAnswer: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex] || null;

  const loadQuiz = (quizId: string) => {
    const quiz = mockQuizzes.find(q => q.id === quizId) || null;
    if (quiz) {
      setCurrentQuiz(quiz);
      setQuestions(mockQuestions[quizId] || []);
      setCurrentQuestionIndex(0);
      setQuizAttempt(null);
      setIsQuizCompleted(false);
      setQuizResult(null);
      setRemainingTime(quiz.timeLimit * 60); // Convert minutes to seconds
    } else {
      toast({
        title: "Quiz not found",
        description: "The requested quiz could not be found.",
        variant: "destructive",
      });
    }
  };

  const startQuiz = () => {
    if (!currentQuiz || !user) return;
    
    const newAttempt: QuizAttempt = {
      quizId: currentQuiz.id,
      userId: user.id,
      answers: [],
      startedAt: Date.now(),
      currentQuestionIndex: 0,
    };
    
    setQuizAttempt(newAttempt);
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setQuizResult(null);
    
    // Start the timer
    startTimer();
    
    toast({
      title: "Quiz started",
      description: `Good luck on "${currentQuiz.title}"!`,
    });
  };

  const startTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    const interval = window.setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const selectAnswer = (questionId: string, optionId: string) => {
    if (!quizAttempt || isQuizCompleted) return;
    
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const isCorrect = question.correctOptionId === optionId;
    
    const existingAnswerIndex = quizAttempt.answers.findIndex(
      a => a.questionId === questionId
    );
    
    const updatedAnswers = [...quizAttempt.answers];
    
    const userAnswer: UserAnswer = {
      questionId,
      selectedOptionId: optionId,
      isCorrect,
    };
    
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = userAnswer;
    } else {
      updatedAnswers.push(userAnswer);
    }
    
    setQuizAttempt({
      ...quizAttempt,
      answers: updatedAnswers,
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    if (!quizAttempt || !currentQuiz || !user) return;
    
    stopTimer();
    
    const endedAt = Date.now();
    const timeTaken = Math.floor((endedAt - quizAttempt.startedAt) / 1000);
    
    const updatedAttempt = {
      ...quizAttempt,
      endedAt,
    };
    
    setQuizAttempt(updatedAttempt);
    
    // Calculate results
    const correctAnswers = updatedAttempt.answers.filter(a => a.isCorrect).length;
    const totalQuestions = questions.length;
    
    // Calculate score (sum of points for correct answers)
    const score = updatedAttempt.answers.reduce((total, answer) => {
      if (answer.isCorrect) {
        const question = questions.find(q => q.id === answer.questionId);
        return total + (question?.points || 0);
      }
      return total;
    }, 0);
    
    // Calculate max possible score
    const maxScore = questions.reduce((total, question) => total + question.points, 0);
    
    const result: QuizResult = {
      id: `result-${Date.now()}`,
      userId: user.id,
      username: user.username,
      quizId: currentQuiz.id,
      quizTitle: currentQuiz.title,
      score,
      maxScore,
      correctAnswers,
      totalQuestions,
      timeTaken,
      completedAt: new Date().toISOString(),
    };
    
    setQuizResult(result);
    setIsQuizCompleted(true);
    
    toast({
      title: "Quiz completed!",
      description: `You scored ${score}/${maxScore} points.`,
    });
  };

  const resetQuiz = () => {
    stopTimer();
    setCurrentQuiz(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setQuizAttempt(null);
    setIsQuizCompleted(false);
    setQuizResult(null);
    setRemainingTime(0);
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        currentQuiz,
        currentQuestion,
        currentQuestionIndex,
        quizAttempt,
        isQuizCompleted,
        quizResult,
        remainingTime,
        loadQuiz,
        startQuiz,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        submitQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
