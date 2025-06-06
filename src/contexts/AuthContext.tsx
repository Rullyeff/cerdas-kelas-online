
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  class?: string;
  subject?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Ahmad Rizky',
    email: 'siswa@demo.com',
    role: 'student',
    avatar: '👨‍🎓',
    class: 'XII IPA 1'
  },
  {
    id: '2',
    name: 'Dr. Sarah Wijaya',
    email: 'guru@demo.com',
    role: 'teacher',
    avatar: '👩‍🏫',
    subject: 'Matematika'
  },
  {
    id: '3',
    name: 'Budi Santoso',
    email: 'admin@demo.com',
    role: 'admin',
    avatar: '👨‍💼'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('eduUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simple demo authentication
    const foundUser = demoUsers.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('eduUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
