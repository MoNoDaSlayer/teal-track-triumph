
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'teal_tracker_auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock authentication 
    // In a real app, this would call an API
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email !== 'demo@example.com' && localStorage.getItem(`user_${email}`) === null) {
        throw new Error('Invalid email or password');
      }
      
      // For demo@example.com we allow any password
      let userData: User;
      
      if (email === 'demo@example.com') {
        userData = {
          id: 'demo-user',
          name: 'Demo User',
          email: 'demo@example.com'
        };
      } else {
        const storedData = localStorage.getItem(`user_${email}`);
        if (!storedData) {
          throw new Error('Invalid email or password');
        }
        
        const parsedData = JSON.parse(storedData);
        if (parsedData.password !== password) {
          throw new Error('Invalid email or password');
        }
        
        userData = {
          id: parsedData.id,
          name: parsedData.name,
          email: parsedData.email
        };
      }
      
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      if (email === 'demo@example.com' || localStorage.getItem(`user_${email}`)) {
        throw new Error('Email already in use');
      }
      
      // Create user
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password // In a real app, this would be hashed
      };
      
      localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
      
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return Promise.reject(new Error('Not authenticated'));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...data };
      
      // Update in local storage
      if (data.email && data.email !== user.email) {
        const userData = localStorage.getItem(`user_${user.email}`);
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.email = data.email;
          parsedData.name = data.name || parsedData.name;
          
          localStorage.removeItem(`user_${user.email}`);
          localStorage.setItem(`user_${data.email}`, JSON.stringify(parsedData));
        }
      } else if (data.name) {
        const userData = localStorage.getItem(`user_${user.email}`);
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.name = data.name;
          localStorage.setItem(`user_${user.email}`, JSON.stringify(parsedData));
        }
      }
      
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) return Promise.reject(new Error('Not authenticated'));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = localStorage.getItem(`user_${user.email}`);
      if (!userData) {
        throw new Error('User data not found');
      }
      
      const parsedData = JSON.parse(userData);
      
      // Mock password validation
      if (parsedData.password !== currentPassword && user.email !== 'demo@example.com') {
        throw new Error('Current password is incorrect');
      }
      
      // Update password
      parsedData.password = newPassword;
      localStorage.setItem(`user_${user.email}`, JSON.stringify(parsedData));
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
