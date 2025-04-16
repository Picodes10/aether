
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockLeaderboard } from "@/data/mockData";
import { Trophy } from "lucide-react";

const LeaderboardPreview = () => {
  // Get the top 5 users
  const topUsers = mockLeaderboard.slice(0, 5);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-quiz-dark mb-4">Top Quiz Champions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our quiz masters! These players have proven their knowledge across multiple categories.
            Can you challenge their scores and make it to the top?
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-quiz-gradient text-white">
              <CardTitle className="flex items-center justify-center text-2xl">
                <Trophy className="mr-2 h-6 w-6" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div 
                    key={user.userId} 
                    className={`flex items-center p-3 rounded-lg ${
                      index === 0 ? 'bg-yellow-50 border border-yellow-200' : 
                      index === 1 ? 'bg-gray-50 border border-gray-200' : 
                      index === 2 ? 'bg-orange-50 border border-orange-200' : 
                      'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-quiz-gradient text-white font-bold text-sm mr-4">
                      {user.rank}
                    </div>
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-gray-500">
                        {user.quizzesTaken} quizzes taken
                      </div>
                    </div>
                    <div className="font-bold text-quiz-primary">
                      {user.totalScore} pts
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link to="/leaderboard" className="quiz-button inline-flex items-center">
                  View Full Leaderboard
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPreview;
