
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatsCard from './StatsCard';
import { BookOpen, Clock, Trophy, CheckCircle, Calendar, PlayCircle } from 'lucide-react';

const StudentDashboard = () => {
  const upcomingClasses = [
    { time: '08:00', subject: 'Matematika', teacher: 'Dr. Sarah Wijaya', room: 'Virtual Room 1' },
    { time: '10:00', subject: 'Fisika', teacher: 'Prof. Ahmad Rahman', room: 'Virtual Room 2' },
    { time: '13:00', subject: 'Kimia', teacher: 'Dr. Maya Sari', room: 'Virtual Room 3' },
  ];

  const assignments = [
    { title: 'Tugas Matematika - Integral', subject: 'Matematika', deadline: '2 hari lagi', status: 'pending' },
    { title: 'Laporan Praktikum Fisika', subject: 'Fisika', deadline: '5 hari lagi', status: 'pending' },
    { title: 'Essay Sejarah Indonesia', subject: 'Sejarah', deadline: 'Selesai', status: 'completed' },
  ];

  const courseProgress = [
    { name: 'Matematika', progress: 85, total: 20, completed: 17 },
    { name: 'Fisika', progress: 70, total: 18, completed: 12 },
    { name: 'Kimia', progress: 92, total: 15, completed: 14 },
    { name: 'Bahasa Indonesia', progress: 78, total: 16, completed: 12 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Siswa</h1>
        <p className="text-gray-600">Selamat datang kembali! Mari lanjutkan pembelajaran Anda.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Kelas Aktif"
          value="6"
          icon={BookOpen}
          change="+2 dari semester lalu"
          changeType="positive"
        />
        <StatsCard
          title="Tugas Pending"
          value="3"
          icon={Clock}
          change="2 mendekati deadline"
          changeType="negative"
        />
        <StatsCard
          title="Rata-rata Nilai"
          value="87.5"
          icon={Trophy}
          change="+5.2 dari bulan lalu"
          changeType="positive"
        />
        <StatsCard
          title="Tugas Selesai"
          value="24"
          icon={CheckCircle}
          change="92% tingkat penyelesaian"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Hari Ini */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Jadwal Hari Ini</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-blue-600 w-12">{class_.time}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{class_.subject}</div>
                  <div className="text-xs text-gray-500">{class_.teacher}</div>
                  <div className="text-xs text-gray-400">{class_.room}</div>
                </div>
                <Button size="sm" variant="outline">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Gabung
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Progress Pembelajaran */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Progress Pembelajaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseProgress.map((course) => (
                <div key={course.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-sm text-gray-500">
                      {course.completed}/{course.total} materi
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={course.progress} className="flex-1" />
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tugas & Pengumuman */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tugas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{assignment.title}</div>
                  <div className="text-xs text-gray-500">{assignment.subject}</div>
                  <div className="text-xs text-gray-400 mt-1">{assignment.deadline}</div>
                </div>
                <Badge variant={assignment.status === 'completed' ? 'default' : 'destructive'}>
                  {assignment.status === 'completed' ? 'Selesai' : 'Pending'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium text-sm text-blue-900">Ujian Tengah Semester</div>
              <div className="text-xs text-blue-700 mt-1">
                Ujian akan dilaksanakan mulai tanggal 15 Maret 2024. Silakan persiapkan diri dengan baik.
              </div>
              <div className="text-xs text-blue-600 mt-2">2 jam yang lalu</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-medium text-sm text-green-900">Perpustakaan Digital</div>
              <div className="text-xs text-green-700 mt-1">
                Koleksi buku digital baru telah tersedia. Akses melalui menu perpustakaan.
              </div>
              <div className="text-xs text-green-600 mt-2">1 hari yang lalu</div>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="font-medium text-sm text-yellow-900">Maintenance System</div>
              <div className="text-xs text-yellow-700 mt-1">
                Sistem akan maintenance pada hari Minggu 10 Maret pukul 02:00 - 04:00 WIB.
              </div>
              <div className="text-xs text-yellow-600 mt-2">3 hari yang lalu</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
