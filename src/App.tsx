import { Toaster } from "components/ui/toaster";
import { Toaster as Sonner } from "components/ui/sonner";
import { TooltipProvider } from "components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import { QuizProvider } from "context/QuizContext";
import Index from "./pages/Index";
import QuizzesPage from "./pages/QuizzesPage";
import QuizDetailPage from "./pages/QuizDetailPage";
import QuizTakePage from "./pages/QuizTakePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Provide react-query client to the app
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Provide tooltip context for UI tooltips */}
    <TooltipProvider>
      {/* Provide authentication context */}
      <AuthProvider>
        {/* Provide quiz-related state context */}
        <QuizProvider>
          {/* Toast notification components */}
          <Toaster />
          <Sonner />
          {/* Define application routes */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quiz/:id" element={<QuizDetailPage />} />
            <Route path="/quiz/:id/take" element={<QuizTakePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QuizProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
