
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Layout, LayoutContent, LayoutHeader } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  ListTodo, 
  User, 
  Info, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="mr-2 h-4 w-4" /> },
    { to: '/titles', label: 'Titles', icon: <ListTodo className="mr-2 h-4 w-4" /> },
    { to: '/profile', label: 'Profile', icon: <User className="mr-2 h-4 w-4" /> },
    { to: '/about', label: 'About Us', icon: <Info className="mr-2 h-4 w-4" /> },
  ];

  return (
    <Layout>
      <LayoutHeader className="border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 justify-between">
          <div className="flex items-center gap-x-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-background">
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex justify-between items-center px-4">
                    <h2 className="text-lg font-medium">Menu</h2>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-col space-y-1 px-2">
                    {navItems.map((item) => (
                      <Button
                        key={item.to}
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          navigate(item.to);
                          setOpen(false);
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    ))}
                    <Button 
                      variant="ghost" 
                      className="justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg md:text-xl font-bold text-teal-400">Teal Tracker</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-md text-sm font-medium
                  ${isActive 
                    ? 'bg-teal-900/50 text-teal-400' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/80'
                  }
                `}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-foreground/70">
              {user?.name}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </LayoutHeader>
      
      <LayoutContent className="container py-8">
        <Outlet />
      </LayoutContent>
    </Layout>
  );
};

export default MainLayout;
