
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search, Settings, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-border px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground font-poppins">
            Edukasi Anak Bangsa
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari..."
              className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent bg-muted placeholder:text-gray-400 min-w-[160px]"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2 pl-2">
            <Avatar>
              <AvatarFallback className="bg-primary text-white font-bold">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm leading-snug text-foreground/80">
              <div className="font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="rounded-full" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
