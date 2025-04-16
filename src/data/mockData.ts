
import { Category, LeaderboardEntry, Question, Quiz, QuizResult, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user1",
    username: "AlexQuizMaster",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    totalScore: 1820,
    quizzesTaken: 24,
    isAdmin: true
  },
  {
    id: "user2",
    username: "QuizWizard",
    email: "wizard@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wizard",
    totalScore: 2150,
    quizzesTaken: 31,
    isAdmin: false
  },
  {
    id: "user3",
    username: "BrainiacGamer",
    email: "brainiac@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brainiac",
    totalScore: 1650,
    quizzesTaken: 19,
    isAdmin: false
  },
  {
    id: "user4",
    username: "QuizProQuo",
    email: "quizpro@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuizPro",
    totalScore: 2400,
    quizzesTaken: 28,
    isAdmin: false
  },
  {
    id: "user5",
    username: "TriviaKing",
    email: "trivia@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trivia",
    totalScore: 2850,
    quizzesTaken: 35,
    isAdmin: false
  }
];

export const mockCurrentUser: User = {
  id: "current-user",
  username: "QuizChampion",
  email: "champion@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Champion",
  totalScore: 1750,
  quizzesTaken: 22,
  isAdmin: false
};

export const mockCategories: Category[] = [
  {
    id: "cat1",
    name: "Science & Technology",
    description: "Test your knowledge of scientific discoveries and technological innovations",
    imageUrl: "/images/science.jpg",
    quizCount: 8
  },
  {
    id: "cat2",
    name: "History",
    description: "Journey through time with questions about historical events and figures",
    imageUrl: "/images/history.jpg",
    quizCount: 6
  },
  {
    id: "cat3",
    name: "Movies & TV",
    description: "Challenge yourself with questions about films, series, and entertainment",
    imageUrl: "/images/movies.jpg",
    quizCount: 10
  },
  {
    id: "cat4",
    name: "Geography",
    description: "Explore the world with questions about countries, capitals, and landmarks",
    imageUrl: "/images/geography.jpg",
    quizCount: 5
  },
  {
    id: "cat5",
    name: "Music",
    description: "Test your knowledge of artists, songs, and musical history",
    imageUrl: "/images/music.jpg",
    quizCount: 7
  },
  {
    id: "cat6",
    name: "Sports",
    description: "Challenge yourself with questions about sports, teams, and championships",
    imageUrl: "/images/sports.jpg",
    quizCount: 9
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz1",
    title: "Tech Giants: History & Innovation",
    description: "Test your knowledge about the world's biggest technology companies and their contributions to modern computing.",
    category: "Science & Technology",
    difficulty: "medium",
    timeLimit: 10,
    questionCount: 10,
    imageUrl: "/images/tech.jpg",
    createdAt: "2025-03-10T15:30:00Z",
    authorId: "user1",
  },
  {
    id: "quiz2",
    title: "Ancient Civilizations",
    description: "Journey back to explore the mysteries and achievements of ancient cultures around the world.",
    category: "History",
    difficulty: "hard",
    timeLimit: 15,
    questionCount: 15,
    imageUrl: "/images/ancient.jpg",
    createdAt: "2025-03-08T10:15:00Z",
    authorId: "user2",
  },
  {
    id: "quiz3",
    title: "Oscar-Winning Movies",
    description: "How well do you know the films that captivated audiences and won the Academy's highest honor?",
    category: "Movies & TV",
    difficulty: "medium",
    timeLimit: 12,
    questionCount: 12,
    imageUrl: "/images/movies.jpg",
    createdAt: "2025-03-05T18:45:00Z",
    authorId: "user1",
  },
  {
    id: "quiz4",
    title: "World Capitals Challenge",
    description: "Can you match these countries with their capitals? Test your global geography knowledge!",
    category: "Geography",
    difficulty: "easy",
    timeLimit: 8,
    questionCount: 20,
    imageUrl: "/images/capitals.jpg",
    createdAt: "2025-03-01T09:30:00Z",
    authorId: "user3",
  },
  {
    id: "quiz5",
    title: "Rock Legends",
    description: "Test your knowledge of the greatest rock bands and artists who shaped music history.",
    category: "Music",
    difficulty: "medium",
    timeLimit: 10,
    questionCount: 15,
    imageUrl: "/images/rock.jpg",
    createdAt: "2025-02-28T14:20:00Z",
    authorId: "user4",
  },
  {
    id: "quiz6",
    title: "Olympic Games History",
    description: "From ancient Greece to modern-day competitions, how much do you know about the Olympic Games?",
    category: "Sports",
    difficulty: "hard",
    timeLimit: 15,
    questionCount: 15,
    imageUrl: "/images/olympics.jpg",
    createdAt: "2025-02-25T11:10:00Z",
    authorId: "user5",
  },
  {
    id: "quiz7",
    title: "Artificial Intelligence Basics",
    description: "Explore the fundamentals of AI, machine learning, and the future of intelligent technology.",
    category: "Science & Technology",
    difficulty: "easy",
    timeLimit: 8,
    questionCount: 10,
    imageUrl: "/images/ai.jpg",
    createdAt: "2025-02-20T16:40:00Z",
    authorId: "user1",
  },
  {
    id: "quiz8",
    title: "Renaissance Art & Artists",
    description: "Test your knowledge of the masterpieces and geniuses of the Renaissance period.",
    category: "History",
    difficulty: "medium",
    timeLimit: 12,
    questionCount: 12,
    imageUrl: "/images/renaissance.jpg",
    createdAt: "2025-02-18T13:25:00Z",
    authorId: "user2",
  }
];

// Tech Giants quiz questions
export const mockQuestions: { [quizId: string]: Question[] } = {
  "quiz1": [
    {
      id: "q1-1",
      quizId: "quiz1",
      text: "Which company was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976?",
      options: [
        { id: "q1-1-a", text: "Microsoft" },
        { id: "q1-1-b", text: "Apple" },
        { id: "q1-1-c", text: "IBM" },
        { id: "q1-1-d", text: "Dell" }
      ],
      correctOptionId: "q1-1-b",
      explanation: "Apple was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne.",
      points: 10
    },
    {
      id: "q1-2",
      quizId: "quiz1",
      text: "Who is the founder of Amazon?",
      options: [
        { id: "q1-2-a", text: "Jeff Bezos" },
        { id: "q1-2-b", text: "Elon Musk" },
        { id: "q1-2-c", text: "Mark Zuckerberg" },
        { id: "q1-2-d", text: "Larry Page" }
      ],
      correctOptionId: "q1-2-a",
      explanation: "Jeff Bezos founded Amazon in 1994 as an online bookstore.",
      points: 10
    },
    {
      id: "q1-3",
      quizId: "quiz1",
      text: "Which of these companies developed the world's first commercially successful graphical user interface (GUI)?",
      options: [
        { id: "q1-3-a", text: "Microsoft" },
        { id: "q1-3-b", text: "IBM" },
        { id: "q1-3-c", text: "Xerox" },
        { id: "q1-3-d", text: "Apple" }
      ],
      correctOptionId: "q1-3-c",
      explanation: "Xerox developed the first GUI at their PARC research center, though Apple later commercialized it successfully with the Macintosh.",
      points: 10
    },
    {
      id: "q1-4",
      quizId: "quiz1",
      text: "Which tech company's motto was 'Don't be evil'?",
      options: [
        { id: "q1-4-a", text: "Facebook" },
        { id: "q1-4-b", text: "Google" },
        { id: "q1-4-c", text: "Microsoft" },
        { id: "q1-4-d", text: "Apple" }
      ],
      correctOptionId: "q1-4-b",
      explanation: "'Don't be evil' was Google's motto and part of their code of conduct until 2018.",
      points: 10
    },
    {
      id: "q1-5",
      quizId: "quiz1",
      text: "Which company created the PlayStation gaming console?",
      options: [
        { id: "q1-5-a", text: "Nintendo" },
        { id: "q1-5-b", text: "Microsoft" },
        { id: "q1-5-c", text: "Sony" },
        { id: "q1-5-d", text: "Sega" }
      ],
      correctOptionId: "q1-5-c",
      explanation: "Sony released the first PlayStation in 1994 in Japan.",
      points: 10
    },
    {
      id: "q1-6",
      quizId: "quiz1",
      text: "Which of these is NOT one of the 'Big Five' tech companies?",
      options: [
        { id: "q1-6-a", text: "Apple" },
        { id: "q1-6-b", text: "IBM" },
        { id: "q1-6-c", text: "Microsoft" },
        { id: "q1-6-d", text: "Amazon" }
      ],
      correctOptionId: "q1-6-b",
      explanation: "The 'Big Five' tech companies are Apple, Amazon, Google (Alphabet), Microsoft, and Facebook (Meta).",
      points: 10
    },
    {
      id: "q1-7",
      quizId: "quiz1",
      text: "Which tech company was originally called 'Backrub'?",
      options: [
        { id: "q1-7-a", text: "Yahoo" },
        { id: "q1-7-b", text: "Google" },
        { id: "q1-7-c", text: "Bing" },
        { id: "q1-7-d", text: "DuckDuckGo" }
      ],
      correctOptionId: "q1-7-b",
      explanation: "Google was originally called 'Backrub' by founders Larry Page and Sergey Brin before being renamed.",
      points: 10
    },
    {
      id: "q1-8",
      quizId: "quiz1",
      text: "Who is the CEO of Tesla and SpaceX?",
      options: [
        { id: "q1-8-a", text: "Jeff Bezos" },
        { id: "q1-8-b", text: "Tim Cook" },
        { id: "q1-8-c", text: "Elon Musk" },
        { id: "q1-8-d", text: "Satya Nadella" }
      ],
      correctOptionId: "q1-8-c",
      explanation: "Elon Musk is the CEO and founder of SpaceX, and the CEO of Tesla.",
      points: 10
    },
    {
      id: "q1-9",
      quizId: "quiz1",
      text: "Which company acquired LinkedIn in 2016?",
      options: [
        { id: "q1-9-a", text: "Google" },
        { id: "q1-9-b", text: "Microsoft" },
        { id: "q1-9-c", text: "Apple" },
        { id: "q1-9-d", text: "Amazon" }
      ],
      correctOptionId: "q1-9-b",
      explanation: "Microsoft acquired LinkedIn for $26.2 billion in 2016.",
      points: 10
    },
    {
      id: "q1-10",
      quizId: "quiz1",
      text: "Which tech company was founded first?",
      options: [
        { id: "q1-10-a", text: "IBM" },
        { id: "q1-10-b", text: "Microsoft" },
        { id: "q1-10-c", text: "Apple" },
        { id: "q1-10-d", text: "Google" }
      ],
      correctOptionId: "q1-10-a",
      explanation: "IBM was founded in 1911, making it the oldest of these tech giants.",
      points: 10
    }
  ]
};

export const mockQuizResults: QuizResult[] = [
  {
    id: "result1",
    userId: "current-user",
    username: "QuizChampion",
    quizId: "quiz2",
    quizTitle: "Ancient Civilizations",
    score: 120,
    maxScore: 150,
    correctAnswers: 12,
    totalQuestions: 15,
    timeTaken: 825, // 13 minutes 45 seconds
    completedAt: "2025-04-10T14:20:30Z"
  },
  {
    id: "result2",
    userId: "current-user",
    username: "QuizChampion",
    quizId: "quiz3",
    quizTitle: "Oscar-Winning Movies",
    score: 100,
    maxScore: 120,
    correctAnswers: 10,
    totalQuestions: 12,
    timeTaken: 632, // 10 minutes 32 seconds
    completedAt: "2025-04-05T09:45:15Z"
  },
  {
    id: "result3",
    userId: "current-user",
    username: "QuizChampion",
    quizId: "quiz5",
    quizTitle: "Rock Legends",
    score: 130,
    maxScore: 150,
    correctAnswers: 13,
    totalQuestions: 15,
    timeTaken: 540, // 9 minutes
    completedAt: "2025-03-28T18:30:00Z"
  },
  {
    id: "result4",
    userId: "current-user",
    username: "QuizChampion",
    quizId: "quiz7",
    quizTitle: "Artificial Intelligence Basics",
    score: 90,
    maxScore: 100,
    correctAnswers: 9,
    totalQuestions: 10,
    timeTaken: 420, // 7 minutes
    completedAt: "2025-03-20T11:15:45Z"
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: "user5",
    username: "TriviaKing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trivia",
    totalScore: 2850,
    quizzesTaken: 35,
    rank: 1
  },
  {
    userId: "user4",
    username: "QuizProQuo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuizPro",
    totalScore: 2400,
    quizzesTaken: 28,
    rank: 2
  },
  {
    userId: "user2",
    username: "QuizWizard",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wizard",
    totalScore: 2150,
    quizzesTaken: 31,
    rank: 3
  },
  {
    userId: "user1",
    username: "AlexQuizMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    totalScore: 1820,
    quizzesTaken: 24,
    rank: 4
  },
  {
    userId: "current-user",
    username: "QuizChampion",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Champion",
    totalScore: 1750,
    quizzesTaken: 22,
    rank: 5
  },
  {
    userId: "user3",
    username: "BrainiacGamer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brainiac",
    totalScore: 1650,
    quizzesTaken: 19,
    rank: 6
  }
];
