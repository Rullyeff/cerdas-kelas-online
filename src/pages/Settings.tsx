
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { User, Lock, Bell, Globe, Shield, Database } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: ''
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', profile);
  };

  const renderStudentSettings = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil Saya
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-600 text-white text-xl">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'S'}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">Ubah Foto</Button>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input 
                id="name" 
                value={profile.name}
                onChange={(e) => setProfile(prev => ({...prev, name: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile(prev => ({...prev, email: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="phone">No. Telepon</Label>
              <Input 
                id="phone" 
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({...prev, phone: e.target.value}))}
                placeholder="081234567890"
              />
            </div>
            <Button type="submit">Simpan Perubahan</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notifikasi Email</Label>
              <p className="text-sm text-gray-600">Terima notifikasi melalui email</p>
            </div>
            <Switch 
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Notifikasi Push</Label>
              <p className="text-sm text-gray-600">Terima notifikasi di browser</p>
            </div>
            <Switch 
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderTeacherSettings = () => (
    <>
      {renderStudentSettings()}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Preferensi Mengajar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Mata Pelajaran Utama</Label>
            <Input id="subject" placeholder="Matematika" />
          </div>
          <div>
            <Label htmlFor="experience">Pengalaman Mengajar</Label>
            <Input id="experience" placeholder="5 tahun" />
          </div>
          <Button>Simpan Preferensi</Button>
        </CardContent>
      </Card>
    </>
  );

  const renderAdminSettings = () => (
    <>
      {renderTeacherSettings()}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Pengaturan Sistem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="schoolName">Nama Sekolah</Label>
            <Input id="schoolName" placeholder="SMA Negeri 1" />
          </div>
          <div>
            <Label htmlFor="academicYear">Tahun Ajaran</Label>
            <Input id="academicYear" placeholder="2024/2025" />
          </div>
          <div>
            <Label htmlFor="semester">Semester</Label>
            <select className="w-full p-2 border rounded-md">
              <option>Semester 1</option>
              <option>Semester 2</option>
            </select>
          </div>
          <Button>Simpan Pengaturan</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Keamanan & Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Backup Data Sistem
          </Button>
          <Button variant="outline" className="w-full">
            Log Aktivitas
          </Button>
          <Button variant="destructive" className="w-full">
            Reset Sistem (Hati-hati!)
          </Button>
        </CardContent>
      </Card>
    </>
  );

  const renderSettingsContent = () => {
    switch (user?.role) {
      case 'student':
        return renderStudentSettings();
      case 'teacher':
        return renderTeacherSettings();
      case 'admin':
        return renderAdminSettings();
      default:
        return renderStudentSettings();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan</h1>
          <p className="text-gray-600">
            Kelola profil dan preferensi akun Anda
          </p>
        </div>

        <div className="grid gap-6">
          {renderSettingsContent()}
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Keamanan Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Ubah Password
              </Button>
              <Button variant="outline" className="w-full">
                Aktivitas Login
              </Button>
              <Button variant="destructive" className="w-full">
                Logout dari Semua Device
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Copyright */}
        <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
          © 2024 Edukasi Anak Bangsa. Copyright by Ibrahim Rully Effendy
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
