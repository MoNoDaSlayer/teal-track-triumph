
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-gradient">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login page and save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export const GuestGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-gradient">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }
  
  if (isAuthenticated) {
    // Redirect authenticated users to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};
