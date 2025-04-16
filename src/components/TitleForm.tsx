
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Title } from '@/contexts/TrackingContext';
import { DialogFooter } from '@/components/ui/dialog';

interface TitleFormProps {
  initialData?: Title;
  onSubmit: (data: Omit<Title, 'id'> | Partial<Omit<Title, 'id'>>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const TitleForm: React.FC<TitleFormProps> = ({ initialData, onSubmit, onCancel, isEdit = false }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [color, setColor] = useState(initialData?.color || '#06b6d4');
  const [targetDays, setTargetDays] = useState<string>(initialData?.targetDays?.toString() || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    setIsSubmitting(true);
    
    const data = {
      name,
      description,
      color,
      ...(targetDays ? { targetDays: parseInt(targetDays, 10) } : {}),
      ...(isEdit ? {} : { startDate: new Date().toISOString() })
    };
    
    onSubmit(data);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Title Name</Label>
        <Input
          id="name"
          placeholder="e.g., No Junk Food, Daily Exercise"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-background/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Add some details about this tracking goal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-background/50 resize-none"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="targetDays">Target Days (Optional)</Label>
        <Input
          id="targetDays"
          type="number"
          placeholder="e.g., 30, 60, 90"
          value={targetDays}
          onChange={(e) => setTargetDays(e.target.value)}
          min="1"
          className="bg-background/50"
        />
        <p className="text-xs text-muted-foreground">
          Set a target number of days for this goal. This will be used to calculate progress.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <div className="flex items-center space-x-4">
          <Input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-10 p-1 bg-background/50"
          />
          <div className="flex-1">
            <Input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Title' : 'Create Title'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default TitleForm;
