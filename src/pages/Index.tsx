
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import LoginForm from '@/components/Auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edukasi Anak Bangsa</h1>
          <p className="text-gray-600">Platform E-Learning untuk SMA</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Masuk ke Akun Anda</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-sm text-gray-900 mb-2">Akun Demo:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div><strong>Siswa:</strong> siswa@demo.com / demo123</div>
                <div><strong>Guru:</strong> guru@demo.com / demo123</div>
                <div><strong>Admin:</strong> admin@demo.com / demo123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2024 Edukasi Anak Bangsa. Copyright by Ibrahim Rully Effendy
        </div>
      </div>
    </div>
  );
};

export default Index;
