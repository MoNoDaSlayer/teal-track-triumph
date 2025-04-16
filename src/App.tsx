
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TrackingProvider } from "./contexts/TrackingContext";
import { AuthGuard, GuestGuard } from "./components/AuthGuard";
import MainLayout from "./components/layout/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Titles from "./pages/Titles";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TrackingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Default route - redirect to login or dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Auth routes - only accessible when not authenticated */}
              <Route 
                path="/login" 
                element={
                  <GuestGuard>
                    <Login />
                  </GuestGuard>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <GuestGuard>
                    <Register />
                  </GuestGuard>
                } 
              />
              
              {/* App routes - require authentication */}
              <Route 
                element={
                  <AuthGuard>
                    <MainLayout />
                  </AuthGuard>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/titles" element={<Titles />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TrackingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
