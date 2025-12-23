import React from 'react';
import { NavBar } from './ui/NavBar';
import { Footer } from './sections/footer';
import { Home, Sparkles, FileText, Calendar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navItems = [
    { name: 'Home', url: '#hero', icon: Home },
    { name: 'Soluzioni', url: '#solution', icon: Sparkles },
    { name: 'Blog', url: '#blog', icon: FileText },
    { name: 'Prenota', url: '#booking', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-background font-sans flex flex-col">
      <NavBar items={navItems} />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;