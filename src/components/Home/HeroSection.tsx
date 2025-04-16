
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Trophy } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-50 py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-quiz-light bg-opacity-60 text-quiz-primary rounded-full px-4 py-1.5 text-sm font-medium mb-2">
              The Ultimate Quiz Experience
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-quiz-dark">
              Challenge Your Knowledge & Climb The <span className="text-transparent bg-clip-text bg-quiz-gradient">Leaderboard</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Test your knowledge across various topics, compete with other quiz enthusiasts, and track your progress in real-time!
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/quizzes">
                <Button size="lg" className="bg-quiz-primary hover:bg-quiz-secondary text-white">
                  Start Quizzing Now
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button size="lg" variant="outline" className="border-quiz-primary text-quiz-primary hover:bg-quiz-light">
                  View Leaderboard
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-quiz-light flex items-center justify-center">
                  <Brain className="w-5 h-5 text-quiz-primary" />
                </div>
                <span className="text-sm font-medium">100+ Unique Quizzes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-quiz-light flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-quiz-primary" />
                </div>
                <span className="text-sm font-medium">10+ Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-quiz-light flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-quiz-primary" />
                </div>
                <span className="text-sm font-medium">Real-time Rankings</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-quiz-primary rounded-lg opacity-20 animate-pulse-scale"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-quiz-secondary rounded-lg opacity-20 animate-pulse-scale" style={{ animationDelay: "1s" }}></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-quiz-gradient p-4 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Tech Giants Quiz</h3>
                    <span className="text-xs font-medium bg-white text-quiz-primary rounded-full px-2 py-0.5">Medium</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-700 font-medium">Question 7 of 10</p>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: "70%" }}></div>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-lg font-semibold text-gray-800">Which tech company was originally called 'Backrub'?</h4>
                  </div>
                  <div className="space-y-3 pt-2">
                    <button className="answer-option">Yahoo</button>
                    <button className="answer-option selected-answer">Google</button>
                    <button className="answer-option">Bing</button>
                    <button className="answer-option">DuckDuckGo</button>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg">Previous</button>
                    <button className="px-4 py-2 text-sm bg-quiz-primary text-white rounded-lg">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
