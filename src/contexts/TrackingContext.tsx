
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

export type Title = {
  id: string;
  name: string;
  startDate: string;
  description?: string;
  color?: string;
};

type TrackingContextType = {
  titles: Title[];
  addTitle: (title: Omit<Title, 'id'>) => void;
  updateTitle: (id: string, title: Partial<Omit<Title, 'id'>>) => void;
  deleteTitle: (id: string) => void;
  resetTitle: (id: string) => void;
  calculateProgress: (title: Title) => { days: number; percentage: number };
  isLoading: boolean;
};

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [titles, setTitles] = useState<Title[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load titles from local storage
  useEffect(() => {
    if (user) {
      const storedTitles = localStorage.getItem(`titles_${user.id}`);
      if (storedTitles) {
        try {
          setTitles(JSON.parse(storedTitles));
        } catch (error) {
          console.error('Failed to parse stored titles:', error);
        }
      } else {
        // Example data for new users
        const exampleTitles = [
          {
            id: 'example1',
            name: 'No Junk Food',
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Staying away from unhealthy snacks',
            color: '#06b6d4'
          },
          {
            id: 'example2',
            name: 'Daily Exercise',
            startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'At least 30 minutes per day',
            color: '#14b8a6'
          }
        ];
        setTitles(exampleTitles);
        localStorage.setItem(`titles_${user.id}`, JSON.stringify(exampleTitles));
      }
    } else {
      setTitles([]);
    }
    setIsLoading(false);
  }, [user]);

  // Save titles to local storage when they change
  useEffect(() => {
    if (user && titles.length > 0) {
      localStorage.setItem(`titles_${user.id}`, JSON.stringify(titles));
    }
  }, [user, titles]);

  const addTitle = (title: Omit<Title, 'id'>) => {
    if (!user) return;
    
    const newTitle = {
      ...title,
      id: `title_${Date.now()}`
    };
    
    setTitles(prev => [...prev, newTitle]);
    
    toast({
      title: "Title added",
      description: `"${title.name}" has been added successfully.`,
    });
  };

  const updateTitle = (id: string, titleData: Partial<Omit<Title, 'id'>>) => {
    if (!user) return;
    
    setTitles(prev => 
      prev.map(t => t.id === id ? { ...t, ...titleData } : t)
    );
    
    toast({
      title: "Title updated",
      description: "The title has been updated successfully.",
    });
  };

  const deleteTitle = (id: string) => {
    if (!user) return;
    
    const titleName = titles.find(t => t.id === id)?.name;
    
    setTitles(prev => prev.filter(t => t.id !== id));
    
    toast({
      title: "Title deleted",
      description: titleName ? `"${titleName}" has been deleted.` : "The title has been deleted.",
    });
  };

  const resetTitle = (id: string) => {
    if (!user) return;
    
    setTitles(prev => 
      prev.map(t => {
        if (t.id === id) {
          return { ...t, startDate: new Date().toISOString() };
        }
        return t;
      })
    );
    
    const titleName = titles.find(t => t.id === id)?.name;
    
    toast({
      title: "Title reset",
      description: titleName ? `"${titleName}" has been reset.` : "The title has been reset.",
    });
  };

  const calculateProgress = (title: Title) => {
    const start = new Date(title.startDate);
    const now = new Date();
    
    // Calculate difference in days
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate percentage (capped at 100%)
    // We'll say 100% is 30 days for this example
    const maxDays = 30;
    const percentage = Math.min(Math.round((diffDays / maxDays) * 100), 100);
    
    return { days: diffDays, percentage };
  };

  const value = {
    titles,
    addTitle,
    updateTitle,
    deleteTitle,
    resetTitle,
    calculateProgress,
    isLoading
  };

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};
