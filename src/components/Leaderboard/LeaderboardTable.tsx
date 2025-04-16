
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaderboardEntry } from "@/types";
import { Trophy, Medal } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const LeaderboardTable = ({ entries }: LeaderboardTableProps) => {
  const { user } = useAuth();
  
  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="font-bold text-yellow-500">1st</span>
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center">
          <Medal className="h-5 w-5 text-gray-400 mr-1" />
          <span className="font-bold text-gray-500">2nd</span>
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center">
          <Medal className="h-5 w-5 text-amber-700 mr-1" />
          <span className="font-bold text-amber-700">3rd</span>
        </div>
      );
    } else {
      return <span className="text-gray-500">{rank}th</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-quiz-primary bg-opacity-5">
            <TableHead className="w-16 text-center">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="text-right">Quizzes</TableHead>
            <TableHead className="text-right">Avg. Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow 
              key={entry.userId}
              className={
                entry.userId === user?.id
                  ? "bg-quiz-light bg-opacity-30"
                  : entry.rank <= 3
                  ? "bg-gray-50"
                  : ""
              }
            >
              <TableCell className="font-medium text-center">
                {getRankDisplay(entry.rank)}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={entry.avatar} alt={entry.username} />
                    <AvatarFallback>{entry.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">
                    {entry.username}
                    {entry.userId === user?.id && (
                      <span className="ml-2 text-xs bg-quiz-primary text-white px-2 py-0.5 rounded-full">You</span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold">{entry.totalScore}</TableCell>
              <TableCell className="text-right">{entry.quizzesTaken}</TableCell>
              <TableCell className="text-right">
                {Math.round(entry.totalScore / (entry.quizzesTaken || 1))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
