
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
    { role: 'Siswa', email: 'siswa@demo.com', password: 'demo123', color: 'from-indigo-400 to-blue-400' },
    { role: 'Guru', email: 'guru@demo.com', password: 'demo123', color: 'from-purple-400 to-pink-400' },
    { role: 'Admin', email: 'admin@demo.com', password: 'demo123', color: 'from-cyan-400 to-blue-400' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 p-4 relative overflow-hidden">
      {/* Background Ornamental Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[-60px] top-[-60px] w-[350px] h-[350px] bg-gradient-to-br from-indigo-400/50 via-purple-400/40 to-blue-400/20 rounded-full blur-2xl opacity-70 animate-pulse" />
        <div className="absolute right-[-80px] bottom-[-60px] w-[350px] h-[350px] bg-gradient-to-tr from-pink-300/50 via-blue-400/30 to-purple-200/30 rounded-full blur-2xl opacity-70 animate-pulse" />
      </div>

      <div className="w-full max-w-md flex flex-col gap-8 z-10">
        {/* Header - gradient text & ikon */}
        <div className="flex flex-col items-center mb-0">
          <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-400 p-2 rounded-full mb-3 shadow-lg ring-4 ring-indigo-200/30">
            <GraduationCap className="h-14 w-14 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-1 font-poppins drop-shadow-sm text-center">Selamat Datang!</h1>
          <p className="text-sm text-indigo-700 mb-2 font-semibold">Portal Edukasi SMA · E-Learning</p>
        </div>
        {/* Card Form */}
        <Card className="rounded-2xl shadow-2xl bg-white/80 border border-blue-200/60 backdrop-blur-md relative overflow-hidden">
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100/40 via-white/10 to-blue-100/20 pointer-events-none rounded-2xl" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-center text-2xl text-indigo-800 font-bold mb-1 tracking-wide">Login Akun</CardTitle>
            <CardDescription className="text-center text-purple-700 font-semibold">Akses fitur lengkap dengan login!</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo-900">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  required
                  className="bg-indigo-50 border-blue-200 focus:border-indigo-500 focus:ring-indigo-200 text-indigo-900 placeholder:text-indigo-400/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-indigo-900">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                    className="bg-indigo-50 border-blue-200 focus:border-indigo-500 focus:ring-indigo-200 text-indigo-900 placeholder:text-indigo-400/70 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-purple-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="bg-red-100 border-red-300">
                  <AlertDescription className="text-red-700 font-semibold">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full gradient-bg from-indigo-500 via-purple-500 to-blue-500 text-white font-bold tracking-wide shadow-lg py-2 rounded-xl hover:from-indigo-600 hover:to-blue-600 hover:via-purple-600 transition-all border-none"
                disabled={isLoading}
                style={{
                  background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #3b82f6 100%)",
                  boxShadow: '0 4px 16px 0 rgba(55,65,81,.15)'
                }}
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>
            {/* Demo Account Section */}
            <div className="mt-7">
              <h3 className="text-indigo-700 font-semibold text-sm mb-3">Akun Demo:</h3>
              <div className="grid gap-3">
                {demoAccounts.map((account) => (
                  <div
                    key={account.role}
                    className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-xl font-medium shadow-sm border border-transparent bg-gradient-to-r ${account.color} hover:shadow-md hover:scale-[1.025] transition-all`}
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                  >
                    <UserCircle2 className="h-6 w-6 text-white drop-shadow-sm" />
                    <div>
                      <div className="text-white text-sm font-semibold">{account.role}</div>
                      <div className="text-xs text-indigo-50">{account.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Footer */}
        <div className="mt-6 text-center text-xs text-indigo-900/70 font-poppins tracking-wide">
          © 2024 Edukasi Anak Bangsa. Inovasi untuk Pendidikan Indonesia.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
