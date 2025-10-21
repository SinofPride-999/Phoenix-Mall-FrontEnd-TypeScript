import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_verified: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await authApi.getCurrentUser();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error: any) {
      // Not authenticated, clear user
      setUser(null);
      console.log('Auth check failed (expected if not logged in):', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.login({ email, password });
      if (response.success) {
        setUser(response.data.user);
        toast({
          title: "Login Successful",
          description: "Welcome back to Phoenix!",
        });
      }
    } catch (error: any) {
      // Show the actual error message from the API
      const errorMessage = error.message || "Invalid email or password";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(userData);
      if (response.success) {
        setUser(response.data.user);
        toast({
          title: "Account Created",
          description: "Welcome to Phoenix! Your account has been created successfully.",
        });
      }
    } catch (error: any) {
      // Show the actual error message from the API
      const errorMessage = error.message || "Something went wrong during registration";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      // Even if the API call fails, clear local state and show success
      setUser(null);
      localStorage.removeItem('access_token');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
