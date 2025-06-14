
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, GraduationCap, UserCircle2 } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-100 via-yellow-50 to-lime-100 p-4">
      <div className="w-full max-w-md flex flex-col gap-7">
        {/* Header - gradient text & ikon */}
        <div className="flex flex-col items-center mb-0">
          <div className="bg-gradient-to-br from-teal-400 via-yellow-300 to-green-300 p-2 rounded-full mb-3 shadow-lg">
            <GraduationCap className="h-14 w-14 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-green-700 via-yellow-600 to-lime-600 bg-clip-text text-transparent mb-1 font-poppins">Selamat Datang!</h1>
          <p className="text-sm text-emerald-800 mb-2 font-semibold">Portal Edukasi SMA · E-Learning</p>
        </div>
        {/* Card Form */}
        <Card className="rounded-xl shadow-xl bg-white/80 border-emerald-200/40">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-emerald-800 font-bold mb-1 tracking-wide">Login Akun</CardTitle>
            <CardDescription className="text-center text-yellow-700 font-semibold">Akses fitur lengkap dengan login!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-emerald-900">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  required
                  className="bg-emerald-50 border-yellow-200 focus:border-emerald-500 focus:ring-emerald-200 text-emerald-900 placeholder:text-emerald-400/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-emerald-900">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                    className="bg-emerald-50 border-yellow-200 focus:border-emerald-500 focus:ring-emerald-200 text-emerald-900 placeholder:text-emerald-400/70 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-yellow-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="bg-yellow-100 border-yellow-300">
                  <AlertDescription className="text-red-700 font-semibold">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-lime-400 text-white font-bold tracking-wide shadow-lg py-2 hover:from-emerald-600 hover:to-lime-500 hover:via-yellow-500 border-none"
                disabled={isLoading}
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>
            {/* Demo Account Section */}
            <div className="mt-7">
              <h3 className="text-emerald-700 font-semibold text-sm mb-3">Akun Demo:</h3>
              <div className="grid gap-3">
                {demoAccounts.map((account) => (
                  <div
                    key={account.role}
                    className="flex items-center bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 transition rounded-lg py-2 px-3 cursor-pointer gap-3"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                  >
                    <UserCircle2 className="h-6 w-6 text-emerald-600" />
                    <div>
                      <div className="font-medium text-emerald-900 text-sm">{account.role}</div>
                      <div className="text-xs text-emerald-700">{account.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Footer */}
        <div className="mt-6 text-center text-xs text-emerald-900/70 font-poppins tracking-wide">
          © 2024 Edukasi Anak Bangsa. Inovasi untuk Pendidikan Indonesia.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

