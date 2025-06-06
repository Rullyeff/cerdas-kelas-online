
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'teacher' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
          <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
