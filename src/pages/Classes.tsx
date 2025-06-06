
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, BookOpen, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Classes = () => {
  const { user } = useAuth();

  const studentClasses = [
    {
      id: 1,
      name: 'Matematika Lanjut',
      teacher: 'Dr. Sarah Wijaya',
      schedule: 'Senin, Rabu 08:00-09:30',
      students: 32,
      progress: 75,
      nextSession: 'Besok 08:00',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Fisika Kuantum',
      teacher: 'Prof. Ahmad Rahman',
      schedule: 'Selasa, Kamis 10:00-11:30',
      students: 28,
      progress: 68,
      nextSession: 'Kamis 10:00',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Kimia Organik',
      teacher: 'Dr. Maya Sari',
      schedule: 'Rabu, Jumat 13:00-14:30',
      students: 30,
      progress: 82,
      nextSession: 'Rabu 13:00',
      color: 'bg-purple-500'
    }
  ];

  const teacherClasses = [
    {
      id: 1,
      name: 'XII IPA 1 - Matematika',
      students: 32,
      schedule: 'Senin, Rabu 08:00-09:30',
      nextSession: 'Besok 08:00',
      assignments: 3,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'XII IPA 2 - Matematika',
      students: 30,
      schedule: 'Selasa, Kamis 10:00-11:30',
      nextSession: 'Kamis 10:00',
      assignments: 2,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'XI IPA 1 - Matematika',
      students: 28,
      schedule: 'Rabu, Jumat 13:00-14:30',
      nextSession: 'Rabu 13:00',
      assignments: 5,
      color: 'bg-purple-500'
    }
  ];

  const classes = user?.role === 'student' ? studentClasses : teacherClasses;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.role === 'student' ? 'Kelas Saya' : 'Kelas yang Diajar'}
            </h1>
            <p className="text-gray-600">
              {user?.role === 'student' 
                ? 'Akses semua kelas yang Anda ikuti'
                : 'Kelola kelas dan siswa Anda'
              }
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Buat Kelas Baru
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-4 h-4 rounded-full ${classItem.color}`}></div>
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    {classItem.students} siswa
                  </Badge>
                </div>
                <CardTitle className="text-lg">{classItem.name}</CardTitle>
                {user?.role === 'student' && (
                  <p className="text-sm text-gray-600">{classItem.teacher}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {classItem.schedule}
                  </div>
                  <div className="text-sm text-gray-900 font-medium">
                    Sesi berikutnya: {classItem.nextSession}
                  </div>
                </div>

                {user?.role === 'student' && 'progress' in classItem && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{classItem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${classItem.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {user?.role === 'teacher' && 'assignments' in classItem && (
                  <div className="text-sm text-gray-600">
                    {classItem.assignments} tugas aktif
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Video className="h-4 w-4 mr-2" />
                    Gabung Kelas
                  </Button>
                  <Button variant="outline" size="icon">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kelas yang Direkomendasikan untuk Siswa */}
        {user?.role === 'student' && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Kelas yang Direkomendasikan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-dashed border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Bahasa Inggris Advanced</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Tingkatkan kemampuan bahasa Inggris untuk persiapan universitas
                  </p>
                  <Button variant="outline">Daftar Sekarang</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Classes;
