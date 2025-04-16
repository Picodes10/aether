import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "types";
import { useToast } from "components/ui/use-toast";

// Flag to use mock authentication for local development/testing without Supabase
const useMockAuth = true;

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

// Create the authentication context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for development/testing
const mockUser: User = {
  id: "mock-user-id",
  username: "DemoUser",
  email: "demo@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser",
  totalScore: 450,
  quizzesTaken: 12,
  isAdmin: false,
};

// AuthProvider component to wrap app and provide auth state and functions
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // User state initialized to mockUser if useMockAuth is true
  const [user, setUser] = useState<User | null>(useMockAuth ? mockUser : null);
  const { toast } = useToast();

  // Placeholder for Supabase session check and auth state subscription
  /*
  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      // Supabase session check code would go here
    };

    checkSession();
    
    // Listen for auth state changes
    // Supabase auth subscription code would go here

    return () => {
      // Cleanup subscription
    };
  }, []);
  */

  // Login function simulating API call and validation for mock auth
  const login = async (email: string, password: string) => {
    try {
      if (useMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
        
        if (email !== "demo@example.com" || password !== "password") {
          throw new Error("Invalid email or password.");
        }
        
        setUser(mockUser);
        
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
        });
        
        return;
      }
      
      // Real Supabase login logic would go here
      
    } catch (error: unknown) {
      let message = "Invalid email or password.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Logout function simulating API call for mock auth
  const logout = async () => {
    if (useMockAuth) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      
      return;
    }
    
    // Real Supabase logout logic would go here
  };

  // Register function simulating API call and validation for mock auth
  const register = async (username: string, email: string, password: string) => {
    try {
      if (useMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        
        if (email === "demo@example.com") {
          throw new Error("Email already in use.");
        }
        
        const newUser: User = {
          id: "new-user-" + Date.now(),
          username,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          totalScore: 0,
          quizzesTaken: 0,
          isAdmin: false,
        };
        
        setUser(newUser);
        
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully.",
        });
        
        return;
      }
      
      // Real Supabase registration logic would go here
      
    } catch (error: unknown) {
      let message = "There was an error creating your account.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: "Registration failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Provide auth state and functions to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume auth context safely
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
