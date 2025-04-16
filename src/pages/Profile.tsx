
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User } from 'lucide-react';

const ProfileTab: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    setIsSubmitting(true);
    
    try {
      await updateProfile({ name, email });
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background/50"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-teal-600 hover:bg-teal-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
};

const SecurityTab: React.FC = () => {
  const { updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;
    if (!currentPassword || !newPassword) return;
    
    setIsSubmitting(true);
    
    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Failed to update password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="bg-background/50"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-background/50"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-background/50"
          required
        />
        {passwordError && (
          <p className="text-destructive text-xs mt-1">{passwordError}</p>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full bg-teal-600 hover:bg-teal-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <Card className="border-muted bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
          <CardDescription>
            Manage your profile information and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
