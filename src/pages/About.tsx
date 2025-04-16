
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">About Teal Tracker</h1>
        <p className="text-muted-foreground">Building better habits, one day at a time</p>
      </div>
      
      <Card className="border-muted bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Teal Tracker was created to help people maintain their positive habits and track progress on their personal goals. 
            We believe that consistent tracking and visual feedback can significantly improve motivation and success rates 
            for forming new habits or breaking old ones.
          </p>
          <p>
            Our simple yet powerful tracking system allows you to create custom titles for anything you want to track, 
            from health goals like "Days Without Sugar" to productivity targets like "Daily Writing Streak" or personal 
            development goals.
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-muted bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Create custom tracking titles with personalized names and descriptions</li>
            <li>Visual progress tracking with circular progress bars</li>
            <li>Day counters to show your streak length</li>
            <li>Secure user accounts to save your tracking data</li>
            <li>Clean, intuitive interface focused on motivation</li>
            <li>Mobile-friendly design for tracking on the go</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-muted bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>About the Company</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Teal Tracker is brought to you by [Your Company Name], a dedicated team focused on creating tools that 
            help people improve their lives through better habits and personal tracking.
          </p>
          <p>
            Founded in [Year], we've been helping thousands of users achieve their personal goals through our 
            intuitive tracking applications and motivational tools.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="outline" className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Our Website
            </Button>
            <Button variant="outline" className="flex items-center">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground pt-4">
        <p>&copy; 2025 [Your Company Name]. All rights reserved.</p>
        <p className="mt-1">
          Made with ❤️ by our dedicated team.
        </p>
      </div>
    </div>
  );
};

export default About;
