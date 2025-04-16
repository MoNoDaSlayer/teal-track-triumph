
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">About Ur Tracker</h1>
        <p className="text-muted-foreground">Empowering Personal Growth, One Day at a Time</p>
      </div>
      
      <Card className="border-muted bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Ur Tracker was created to help individuals maintain accountability and track personal milestones. 
            We believe that consistent tracking and visual feedback can significantly improve motivation 
            and success rates for forming new habits or breaking old ones.
          </p>
          <p>
            Our intuitive tracking system allows you to create custom titles for anything you want to monitor, 
            from personal health goals like "Days Without Sugar" to productivity targets like "Daily Writing Streak" 
            or personal development challenges.
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-muted bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Create personalized tracking titles with custom names and descriptions</li>
            <li>Visualize progress with interactive circular progress bars</li>
            <li>Track streak lengths with precise day counters</li>
            <li>Secure user accounts to preserve your tracking data</li>
            <li>Clean, motivational interface designed for personal growth</li>
            <li>Fully responsive design for tracking anywhere, anytime</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-muted bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>About the Platform</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Ur Tracker is a passion project dedicated to helping individuals take control of their personal 
            development journey. We understand that growth is a personal and unique experience, and our 
            platform is designed to support you every step of the way.
          </p>
          <p>
            Built with simplicity and motivation in mind, Ur Tracker provides the tools you need to 
            turn your goals into lasting habits.
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
        <p>&copy; 2025 Ur Tracker. All rights reserved.</p>
        <p className="mt-1">
          Crafted with ❤️ to help you grow.
        </p>
      </div>
    </div>
  );
};

export default About;

