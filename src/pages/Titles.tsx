
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Title, useTracking } from '@/contexts/TrackingContext';
import { Loader2, Plus, Pencil, Trash2, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import TitleForm from '@/components/TitleForm';

const TitleCard: React.FC<{
  title: Title;
  onEdit: (title: Title) => void;
  onDelete: (id: string) => void;
  onReset: (id: string) => void;
}> = ({ title, onEdit, onDelete, onReset }) => {
  const { calculateProgress } = useTracking();
  const { days, percentage } = calculateProgress(title);
  
  return (
    <Card className="border-muted bg-card/30 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title.name}</CardTitle>
            {title.description && (
              <CardDescription className="mt-1">
                {title.description}
              </CardDescription>
            )}
          </div>
          <div 
            className="h-4 w-4 rounded-full" 
            style={{ backgroundColor: title.color || '#06b6d4' }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          Started {new Date(title.startDate).toLocaleDateString()}
        </p>
        
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <span className="text-3xl font-bold block">{days}</span>
            <span className="text-xs text-muted-foreground">days</span>
          </div>
        </div>
        
        {title.targetDays && (
          <div className="w-full mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{Math.min(days, title.targetDays)}/{title.targetDays}</span>
              <span>{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => onEdit(title)}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{title.name}" and all its data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onDelete(title.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-amber-500 hover:text-amber-500"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset counter?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset the counter for "{title.name}" to zero. The history will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onReset(title.id)}
                className="bg-amber-600 text-white hover:bg-amber-700"
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

const Titles: React.FC = () => {
  const { titles, addTitle, updateTitle, deleteTitle, resetTitle, isLoading } = useTracking();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState<Title | null>(null);
  
  const handleEditTitle = (title: Title) => {
    setEditingTitle(title);
  };
  
  const handleUpdateTitle = (data: Partial<Omit<Title, 'id'>>) => {
    if (editingTitle) {
      updateTitle(editingTitle.id, data);
      setEditingTitle(null);
    }
  };
  
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
        <h1 className="text-2xl font-bold">Tracking Titles</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Title
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Tracking Title</DialogTitle>
              <DialogDescription>
                Add a new title to track your progress.
              </DialogDescription>
            </DialogHeader>
            <TitleForm 
              onSubmit={(data) => {
                addTitle(data as Omit<Title, 'id'>);
                setIsAddDialogOpen(false);
              }}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        
        <Dialog open={!!editingTitle} onOpenChange={(open) => !open && setEditingTitle(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Tracking Title</DialogTitle>
              <DialogDescription>
                Update the details for this tracking title.
              </DialogDescription>
            </DialogHeader>
            {editingTitle && (
              <TitleForm 
                initialData={editingTitle}
                onSubmit={handleUpdateTitle}
                onCancel={() => setEditingTitle(null)}
                isEdit
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {titles.length === 0 ? (
          <Card className="col-span-full border-dashed border-muted bg-card/30 backdrop-blur-sm">
            <CardContent className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-muted/30 p-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">No tracking titles yet</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Create your first tracking title to start monitoring your progress.
                  </p>
                </div>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Create Your First Title
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          titles.map((title) => (
            <TitleCard 
              key={title.id} 
              title={title} 
              onEdit={handleEditTitle}
              onDelete={deleteTitle}
              onReset={resetTitle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Titles;
