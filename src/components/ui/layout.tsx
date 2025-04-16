
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-dark-gradient">
      {children}
    </div>
  );
};

interface LayoutHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ children, className, ...props }) => {
  return (
    <header className={`sticky top-0 z-50 w-full ${className}`} {...props}>
      {children}
    </header>
  );
};

interface LayoutContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children, className, ...props }) => {
  return (
    <main className={`flex-1 ${className}`} {...props}>
      {children}
    </main>
  );
};

export { Layout, LayoutHeader, LayoutContent };
