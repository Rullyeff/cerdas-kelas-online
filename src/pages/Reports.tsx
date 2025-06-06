
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, FileText, TrendingUp, Users, BookOpen, GraduationCap, Activity } from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');

  const academicData = [
    { month: 'Jan', rata_rata: 82.5, kehadiran: 92 },
    { month: 'Feb', rata_rata: 84.2, kehadiran: 94 },
    { month: 'Mar', rata_rata: 83.8, kehadiran: 91 },
    { month: 'Apr', rata_rata: 85.1, kehadiran: 93 },
    { month: 'Mei', rata_rata: 86.3, kehadiran: 95 },
    { month: 'Jun', rata_rata: 87.2, kehadiran: 96 }
  ];

  const subjectPerformance = [
    { subject: 'Matematika', average: 85.2, students: 120 },
    { subject: 'Fisika', average: 82.1, students: 95 },
    { subject: 'Kimia', average: 88.5, students: 95 },
    { subject: 'Biologi', average: 86.3, students: 85 },
    { subject: 'B. Indonesia', average: 89.1, students: 150 },
    { subject: 'B. Inggris', average: 84.7, students: 150 }
  ];

  const classDistribution = [
    { name: 'XII IPA', value: 180, color: '#8884d8' },
    { name: 'XII IPS', value: 120, color: '#82ca9d' },
    { name: 'XI IPA', value: 165, color: '#ffc658' },
    { name: 'XI IPS', value: 110, color: '#ff7300' },
    { name: 'X', value: 200, color: '#00ff88' }
  ];

  const systemStats = [
    { metric: 'Total Pengguna Aktif', value: '1,247', trend: '+12%', icon: Users },
    { metric: 'Tugas Dikumpulkan', value: '3,456', trend: '+18%', icon: FileText },
    { metric: 'Rata-rata Login Harian', value: '892', trend: '+5%', icon: Activity },
    { metric: 'Tingkat Keterlibatan', value: '94.2%', trend: '+2.1%', icon: TrendingUp }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Laporan Sistem</h1>
            <p className="text-gray-600">Analisis mendalam tentang performa akademik dan sistem</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Filter Tanggal
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Filter Periode */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dateRange">Periode Laporan</Label>
                <select 
                  id="dateRange" 
                  className="w-full p-2 border rounded-md"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="7">7 Hari Terakhir</option>
                  <option value="30">30 Hari Terakhir</option>
                  <option value="90">3 Bulan Terakhir</option>
                  <option value="365">1 Tahun Terakhir</option>
                </select>
              </div>
              <div>
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input id="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistik Sistem */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.metric}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tren Akademik Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={academicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rata_rata" stroke="#8884d8" strokeWidth={2} name="Rata-rata Nilai" />
                  <Line type="monotone" dataKey="kehadiran" stroke="#82ca9d" strokeWidth={2} name="Kehadiran %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribusi Siswa per Tingkat</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={classDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {classDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performa Mata Pelajaran */}
        <Card>
          <CardHeader>
            <CardTitle>Performa Mata Pelajaran</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#8884d8" name="Rata-rata Nilai" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ringkasan Laporan */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Laporan Akademik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Mata Pelajaran Terbaik</p>
                    <p className="text-lg font-bold">Bahasa Indonesia</p>
                    <p className="text-sm text-gray-500">Rata-rata: 89.1</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Tingkat Kehadiran</p>
                    <p className="text-lg font-bold">94.2%</p>
                    <p className="text-sm text-gray-500">Bulan ini</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Siswa Berprestasi</p>
                    <p className="text-lg font-bold">127 Siswa</p>
                    <p className="text-sm text-gray-500">Nilai ≥ 85</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
