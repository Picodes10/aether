import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import ProfileStats from "@/components/Profile/ProfileStats";
import QuizHistoryTable from "@/components/Profile/QuizHistoryTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuizResults } from "@/data/mockData";
import { Pencil, User, LogOut, Trophy } from "lucide-react";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 shadow-md">
            <CardContent className="p-0">
              <div className="bg-quiz-gradient h-32 md:h-48 rounded-t-lg"></div>
              <div className="px-6 md:px-10 pb-6 pt-0 md:pt-0 -mt-16 md:-mt-20">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="text-4xl">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold">{user.username}</h1>
                    <p className="text-gray-500">{user.email}</p>
                    <div className="flex gap-2 mt-4">
                      <div className="bg-quiz-light text-quiz-primary px-3 py-1 rounded-full text-sm">
                        Rank #{mockQuizResults.length > 0 ? "5" : "Unranked"}
                      </div>
                      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {user.totalScore} Total Points
                      </div>
                      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {user.quizzesTaken} Quizzes Taken
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Pencil className="mr-1 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center text-red-500 hover:text-red-600"
                      onClick={logout}
                    >
                      <LogOut className="mr-1 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing ? (
            <Card className="mb-8 shadow-md">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar URL</Label>
                      <Input
                        id="avatar"
                        value={user.avatar}
                        disabled
                      />
                      <p className="text-xs text-gray-500">Avatar can't be changed in the demo</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
              <ProfileStats user={user} />
            </>
          )}

          <div className="mt-12">
            <Tabs defaultValue="history">
              <div className="border-b mb-6">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="history" className="text-base">Quiz History</TabsTrigger>
                  <TabsTrigger value="achievements" className="text-base">Achievements</TabsTrigger>
                  <TabsTrigger value="settings" className="text-base">Settings</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="history">
                <h3 className="text-xl font-semibold mb-4">Quiz History</h3>
                {mockQuizResults.length > 0 ? (
                  <QuizHistoryTable results={mockQuizResults} />
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <User className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No quiz history</h3>
                    <p className="mt-2 text-gray-500">You haven't taken any quizzes yet.</p>
                    <Button 
                      className="mt-6 bg-quiz-primary hover:bg-quiz-secondary"
                      onClick={() => navigate("/quizzes")}
                    >
                      Find a Quiz
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="achievements">
                <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Trophy className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Coming Soon</h3>
                  <p className="mt-2 text-gray-500">Achievements will be available in a future update.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings">
                <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your account settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive email updates about new quizzes and results</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Coming soon</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Privacy Settings</h4>
                          <p className="text-sm text-gray-500">Control who can see your quiz results and profile information</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Coming soon</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Coming soon</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
