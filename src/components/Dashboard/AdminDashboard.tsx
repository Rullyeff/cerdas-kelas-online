
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatsCard from './StatsCard';
import { Users, GraduationCap, BookOpen, TrendingUp, UserPlus, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  const monthlyData = [
    { month: 'Jan', siswa: 450, guru: 25, kelas: 48 },
    { month: 'Feb', siswa: 465, guru: 26, kelas: 52 },
    { month: 'Mar', siswa: 478, guru: 27, kelas: 55 },
    { month: 'Apr', siswa: 485, guru: 28, kelas: 58 },
    { month: 'Mei', siswa: 492, guru: 28, kelas: 60 },
    { month: 'Jun', siswa: 510, guru: 30, kelas: 65 },
  ];

  const performanceData = [
    { subject: 'Matematika', average: 85.2 },
    { subject: 'Fisika', average: 82.1 },
    { subject: 'Kimia', average: 88.5 },
    { subject: 'Biologi', average: 86.3 },
    { subject: 'B. Indonesia', average: 89.1 },
  ];

  const recentUsers = [
    { name: 'Siti Aminah', role: 'Siswa', class: 'XII IPA 3', status: 'active', joined: '2 hari lalu' },
    { name: 'Dr. Budi Rahman', role: 'Guru', subject: 'Fisika', status: 'active', joined: '1 minggu lalu' },
    { name: 'Andi Pratama', role: 'Siswa', class: 'XI IPS 2', status: 'pending', joined: '3 hari lalu' },
  ];

  const systemStats = [
    { metric: 'Server Uptime', value: '99.8%', status: 'excellent' },
    { metric: 'Response Time', value: '245ms', status: 'good' },
    { metric: 'Storage Used', value: '68%', status: 'warning' },
    { metric: 'Active Sessions', value: '1,247', status: 'good' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola sistem dan pantau performa platform secara keseluruhan.</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Tambah User
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Pengaturan
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Siswa"
          value="510"
          icon={Users}
          change="+18 siswa baru bulan ini"
          changeType="positive"
        />
        <StatsCard
          title="Total Guru"
          value="30"
          icon={GraduationCap}
          change="+2 guru baru"
          changeType="positive"
        />
        <StatsCard
          title="Kelas Aktif"
          value="65"
          icon={BookOpen}
          change="+5 kelas baru"
          changeType="positive"
        />
        <StatsCard
          title="Tingkat Aktivitas"
          value="94.2%"
          icon={TrendingUp}
          change="+2.1% dari bulan lalu"
          changeType="positive"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tren Pertumbuhan Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="siswa" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="guru" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performa Akademik per Mata Pelajaran</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Management & System Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pengguna Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">
                    {user.role} {user.class || user.subject}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{user.joined}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status === 'active' ? 'Aktif' : 'Pending'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Kelola
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Sistem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{stat.metric}</div>
                  <div className="text-lg font-bold mt-1">{stat.value}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  stat.status === 'excellent' ? 'bg-green-500' :
                  stat.status === 'good' ? 'bg-blue-500' :
                  stat.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              Lihat Detail Sistem
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Kelola Siswa</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <GraduationCap className="h-6 w-6 mb-2" />
              <span className="text-sm">Kelola Guru</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="text-sm">Kelola Kelas</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              <span className="text-sm">Pengaturan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
