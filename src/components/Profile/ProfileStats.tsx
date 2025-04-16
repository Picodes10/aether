
import { Card, CardContent } from "@/components/ui/card";
import { User, QuizResult } from "@/types";
import { Award, CheckCircle, Clock, HelpCircle } from "lucide-react";
import { mockQuizResults } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ProfileStatsProps {
  user: User;
}

const ProfileStats = ({ user }: ProfileStatsProps) => {
  // In a real app, we'd fetch this data from an API
  const quizResults: QuizResult[] = mockQuizResults;
  
  // Calculate stats
  const totalQuizzesTaken = user.quizzesTaken;
  const totalPoints = user.totalScore;
  const averageScore = totalPoints / totalQuizzesTaken;
  
  const totalQuestions = quizResults.reduce((sum, result) => sum + result.totalQuestions, 0);
  const correctAnswers = quizResults.reduce((sum, result) => sum + result.correctAnswers, 0);
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Distribution of correct/incorrect answers for pie chart
  const answerData = [
    { name: 'Correct', value: correctAnswers },
    { name: 'Incorrect', value: totalQuestions - correctAnswers }
  ];
  
  const COLORS = ['#22c55e', '#ef4444'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Quizzes</p>
              <p className="text-3xl font-bold text-quiz-dark">{totalQuizzesTaken}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-quiz-light flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-quiz-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {totalQuizzesTaken > 0
                ? `You've completed ${totalQuizzesTaken} quizzes so far!`
                : "Start your first quiz today!"}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Score</p>
              <p className="text-3xl font-bold text-quiz-dark">{totalPoints}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-quiz-light flex items-center justify-center">
              <Award className="h-6 w-6 text-quiz-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {totalPoints > 0
                ? `Average: ${Math.round(averageScore)} pts per quiz`
                : "Complete quizzes to earn points!"}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Accuracy</p>
              <p className="text-3xl font-bold text-quiz-dark">{accuracy}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-quiz-light flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-quiz-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {correctAnswers} correct out of {totalQuestions} questions
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Time</p>
              <p className="text-3xl font-bold text-quiz-dark">
                {totalQuizzesTaken > 0
                  ? `${Math.round(
                      quizResults.reduce((sum, result) => sum + result.timeTaken, 0) /
                        totalQuizzesTaken / 60
                    )}m`
                  : "0m"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-quiz-light flex items-center justify-center">
              <Clock className="h-6 w-6 text-quiz-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Average time to complete a quiz
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Answer Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={answerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {answerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Correct</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Incorrect</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Quiz Results</h3>
          <div className="space-y-4">
            {quizResults.slice(0, 4).map((result) => (
              <div key={result.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium">{result.quizTitle}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(result.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{result.score}/{result.maxScore}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((result.score / result.maxScore) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStats;
