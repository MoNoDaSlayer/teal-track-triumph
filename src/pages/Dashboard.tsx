
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTracking } from '@/contexts/TrackingContext';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgressCircle = ({ 
  percentage,
  days,
  title,
  description,
  color = "#06b6d4"  
}: { 
  percentage: number;
  days: number;
  title: string;
  description?: string;
  color?: string;
}) => {
  // Set the circumference for the circle
  const size = 150;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center h-[150px] w-[150px]">
        {/* Background circle */}
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ "--progress": `${percentage} 100` } as React.CSSProperties}
            className="animate-progress"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{days}</span>
          <span className="text-xs text-muted-foreground">days</span>
        </div>
      </div>
      <h3 className="text-lg font-medium mt-4 text-center">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground text-center mt-1">
          {description}
        </p>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { titles, calculateProgress, isLoading } = useTracking();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button asChild variant="outline" size="sm" className="text-teal-400 border-teal-500 hover:bg-teal-900/20">
          <Link to="/titles">
            <Plus className="h-4 w-4 mr-2" />
            Add Title
          </Link>
        </Button>
      </div>
      
      {titles.length === 0 ? (
        <Card className="border-dashed border-muted bg-card/30 backdrop-blur-sm">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-muted/30 p-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">No tracking titles yet</h3>
                <p className="text-muted-foreground max-w-sm">
                  Create your first tracking title to start monitoring your progress and stay motivated.
                </p>
              </div>
              <Button asChild variant="default" className="bg-teal-600 hover:bg-teal-700">
                <Link to="/titles">
                  Create Your First Title
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {titles.map((title) => {
            const { days, percentage } = calculateProgress(title);
            return (
              <Card key={title.id} className="border-muted bg-card/30 backdrop-blur-sm">
                <CardContent className="py-6">
                  <ProgressCircle 
                    percentage={percentage}
                    days={days}
                    title={title.name}
                    description={title.description}
                    color={title.color}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
