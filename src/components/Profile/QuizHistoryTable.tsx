
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { QuizResult } from "@/types";
import { format } from "date-fns";
import { CheckCircle, Clock, Award } from "lucide-react";

interface QuizHistoryTableProps {
  results: QuizResult[];
}

const QuizHistoryTable = ({ results }: QuizHistoryTableProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreBadge = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) {
      return <Badge className="bg-green-500">Excellent</Badge>;
    } else if (percentage >= 60) {
      return <Badge className="bg-blue-500">Good</Badge>;
    } else if (percentage >= 40) {
      return <Badge className="bg-yellow-500">Average</Badge>;
    } else {
      return <Badge className="bg-red-500">Needs Improvement</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-quiz-primary bg-opacity-5">
            <TableHead>Quiz Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-center">Correct</TableHead>
            <TableHead className="text-center">Time</TableHead>
            <TableHead className="text-center">Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{result.quizTitle}</TableCell>
              <TableCell>{format(new Date(result.completedAt), 'MMM d, yyyy')}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <Award className="h-4 w-4 mr-1 text-quiz-primary" />
                  <span>
                    {result.score}/{result.maxScore}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  <span>
                    {result.correctAnswers}/{result.totalQuestions}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1 text-blue-500" />
                  <span>{formatTime(result.timeTaken)}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {getScoreBadge(result.score, result.maxScore)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuizHistoryTable;
