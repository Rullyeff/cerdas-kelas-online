
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Email atau password tidak valid');
    }
  };

  const demoAccounts = [
    { role: 'Siswa', email: 'siswa@demo.com', password: 'demo123' },
    { role: 'Guru', email: 'guru@demo.com', password: 'demo123' },
    { role: 'Admin', email: 'admin@demo.com', password: 'demo123' },
  ];

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center text-white">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-12 w-12" />
            <h1 className="text-4xl font-bold">EduSMA</h1>
          </div>
          <p className="text-lg opacity-90">Platform E-Learning untuk Masa Depan</p>
        </div>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Masuk ke Akun</CardTitle>
            <CardDescription className="text-center text-white/80">
              Gunakan kredensial demo di bawah untuk mencoba platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="bg-red-500/20 border-red-500/30">
                  <AlertDescription className="text-white">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-white text-gray-900 hover:bg-white/90"
                disabled={isLoading}
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>

            <div className="mt-6">
              <h3 className="text-white font-medium mb-3">Akun Demo:</h3>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <div
                    key={account.role}
                    className="bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                  >
                    <div className="text-white font-medium">{account.role}</div>
                    <div className="text-white/70 text-sm">{account.email}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
