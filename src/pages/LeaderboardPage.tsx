
import MainLayout from "@/components/Layout/MainLayout";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import { mockLeaderboard } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy } from "lucide-react";

const LeaderboardPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-quiz-light bg-opacity-60 text-quiz-primary rounded-full px-4 py-1.5 text-sm font-medium mb-3">
            <Trophy className="h-4 w-4 mr-2" />
            Global Rankings
          </div>
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The top quiz masters sorted by their total points. Challenge yourself to reach the top
            and become the ultimate QuizQuest champion!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all-time" className="mb-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="daily">Today</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all-time" className="mt-6">
              <LeaderboardTable entries={mockLeaderboard} />
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-6">
              <LeaderboardTable entries={mockLeaderboard.slice(0, 4)} />
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-6">
              <LeaderboardTable entries={mockLeaderboard.slice(1, 5)} />
            </TabsContent>
            
            <TabsContent value="daily" className="mt-6">
              <LeaderboardTable entries={mockLeaderboard.slice(2, 6)} />
            </TabsContent>
          </Tabs>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">How to Climb the Ranks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-quiz-light flex items-center justify-center mb-3">
                  <span className="font-bold text-quiz-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Take More Quizzes</h3>
                <p className="text-gray-600 text-sm">
                  The more quizzes you complete, the more points you can earn to boost your ranking.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-quiz-light flex items-center justify-center mb-3">
                  <span className="font-bold text-quiz-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Answer Accurately</h3>
                <p className="text-gray-600 text-sm">
                  Your score is based on correct answers. Aim for precision to maximize your points.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-quiz-light flex items-center justify-center mb-3">
                  <span className="font-bold text-quiz-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Complete Quickly</h3>
                <p className="text-gray-600 text-sm">
                  Finishing quizzes faster can earn you time bonuses, adding to your total score.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              className="bg-quiz-primary hover:bg-quiz-secondary"
              size="lg"
              asChild
            >
              <a href="/quizzes">Take a Quiz Now</a>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LeaderboardPage;
