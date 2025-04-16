
import { useEffect, useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { AlertTriangle } from "lucide-react";

const QuizTimer = () => {
  const { remainingTime, submitQuiz } = useQuiz();
  const [isWarning, setIsWarning] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate percentage of time remaining
  const timePercentage = (remainingTime / (10 * 60)) * 100; // Assuming 10 min quiz

  // Show warning when less than 1 minute remains
  useEffect(() => {
    if (remainingTime <= 60) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
  }, [remainingTime]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Time Remaining</span>
        <span className={`text-sm font-medium ${isWarning ? 'text-red-500 animate-pulse' : ''}`}>
          {isWarning && <AlertTriangle className="inline-block mr-1 h-4 w-4" />}
          {formatTime(remainingTime)}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${isWarning ? 'bg-red-500' : 'bg-quiz-primary'} transition-all duration-1000 ease-linear`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;
