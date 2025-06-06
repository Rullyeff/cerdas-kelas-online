
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatsCard from './StatsCard';
import { Users, BookOpen, Clock, CheckCircle, Calendar, Plus, FileText } from 'lucide-react';

const TeacherDashboard = () => {
  const todayClasses = [
    { time: '08:00', class: 'XII IPA 1', subject: 'Matematika - Integral', students: 32 },
    { time: '10:00', class: 'XII IPA 2', subject: 'Matematika - Integral', students: 30 },
    { time: '13:00', class: 'XI IPA 1', subject: 'Matematika - Limit', students: 28 },
  ];

  const pendingAssignments = [
    { title: 'Tugas Integral', class: 'XII IPA 1', submitted: 28, total: 32, deadline: '2 hari lagi' },
    { title: 'Quiz Limit Fungsi', class: 'XI IPA 1', submitted: 25, total: 28, deadline: '1 hari lagi' },
    { title: 'Laporan Praktikum', class: 'XII IPA 2', submitted: 30, total: 30, deadline: 'Berakhir' },
  ];

  const recentActivity = [
    { action: 'Siswa mengumpulkan tugas', detail: 'Ahmad Rizky - Tugas Integral', time: '5 menit lalu' },
    { action: 'Pesan baru', detail: 'Pertanyaan tentang materi limit', time: '15 menit lalu' },
    { action: 'Tugas baru dibuat', detail: 'Quiz Diferensial untuk XII IPA 1', time: '1 jam lalu' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Guru</h1>
          <p className="text-gray-600">Kelola kelas dan pantau progress siswa Anda.</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Buat Tugas
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Buat Materi
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Siswa"
          value="120"
          icon={Users}
          change="+8 siswa baru"
          changeType="positive"
        />
        <StatsCard
          title="Kelas Aktif"
          value="4"
          icon={BookOpen}
          change="Semester ini"
          changeType="neutral"
        />
        <StatsCard
          title="Tugas Menunggu"
          value="15"
          icon={Clock}
          change="Perlu diperiksa"
          changeType="negative"
        />
        <StatsCard
          title="Nilai Diberikan"
          value="48"
          icon={CheckCircle}
          change="Minggu ini"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Mengajar Hari Ini */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Jadwal Hari Ini</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((class_, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-blue-600">{class_.time}</div>
                  <Badge variant="outline">{class_.students} siswa</Badge>
                </div>
                <div className="font-medium text-sm">{class_.class}</div>
                <div className="text-xs text-gray-500">{class_.subject}</div>
                <Button size="sm" className="w-full mt-2">
                  Mulai Kelas
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tugas Menunggu Koreksi */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tugas Menunggu Koreksi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{assignment.title}</div>
                  <div className="text-xs text-gray-500">{assignment.class}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {assignment.submitted}/{assignment.total} siswa mengumpulkan
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={assignment.submitted === assignment.total ? 'default' : 'destructive'}>
                    {assignment.deadline}
                  </Badge>
                  <Button size="sm" variant="outline" className="mt-2 block">
                    Koreksi
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Aktivitas Terbaru & Statistik Kelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.action}</div>
                  <div className="text-xs text-gray-600">{activity.detail}</div>
                  <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performa Kelas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">XII IPA 1</div>
                  <div className="text-xs text-gray-500">32 siswa</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">88.5</div>
                  <div className="text-xs text-gray-500">Rata-rata</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">XII IPA 2</div>
                  <div className="text-xs text-gray-500">30 siswa</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">85.2</div>
                  <div className="text-xs text-gray-500">Rata-rata</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">XI IPA 1</div>
                  <div className="text-xs text-gray-500">28 siswa</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-600">82.7</div>
                  <div className="text-xs text-gray-500">Rata-rata</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
