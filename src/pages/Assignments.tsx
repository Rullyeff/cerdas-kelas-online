
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, FileText, Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Assignments = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const studentAssignments = [
    {
      id: 1,
      title: 'Tugas Matematika - Integral',
      subject: 'Matematika',
      teacher: 'Dr. Sarah Wijaya',
      description: 'Kerjakan soal-soal integral tentu dan tak tentu pada buku halaman 120-125',
      dueDate: '2024-03-15',
      status: 'pending',
      points: 100,
      submittedAt: null
    },
    {
      id: 2,
      title: 'Laporan Praktikum Fisika',
      subject: 'Fisika',
      teacher: 'Prof. Ahmad Rahman',
      description: 'Buat laporan praktikum tentang hukum Newton',
      dueDate: '2024-03-18',
      status: 'pending',
      points: 80,
      submittedAt: null
    },
    {
      id: 3,
      title: 'Essay Sejarah Indonesia',
      subject: 'Sejarah',
      teacher: 'Dr. Maya Sari',
      description: 'Tulis essay tentang perjuangan kemerdekaan Indonesia',
      dueDate: '2024-03-10',
      status: 'submitted',
      points: 90,
      submittedAt: '2024-03-09'
    }
  ];

  const teacherAssignments = [
    {
      id: 1,
      title: 'Tugas Integral',
      class: 'XII IPA 1',
      subject: 'Matematika',
      dueDate: '2024-03-15',
      submitted: 28,
      total: 32,
      points: 100
    },
    {
      id: 2,
      title: 'Quiz Limit Fungsi',
      class: 'XI IPA 1',
      subject: 'Matematika',
      dueDate: '2024-03-20',
      submitted: 25,
      total: 28,
      points: 50
    },
    {
      id: 3,
      title: 'Ujian Tengah Semester',
      class: 'XII IPA 2',
      subject: 'Matematika',
      dueDate: '2024-03-22',
      submitted: 30,
      total: 30,
      points: 200
    }
  ];

  const assignments = user?.role === 'student' ? studentAssignments : teacherAssignments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.role === 'student' ? 'Tugas Saya' : 'Manajemen Tugas'}
            </h1>
            <p className="text-gray-600">
              {user?.role === 'student' 
                ? 'Lihat dan kerjakan tugas yang diberikan guru'
                : 'Kelola tugas untuk siswa Anda'
              }
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Tugas Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Buat Tugas Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Tugas</Label>
                    <Input id="title" placeholder="Masukkan judul tugas" />
                  </div>
                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea id="description" placeholder="Deskripsi tugas" rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Tanggal Deadline</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="points">Poin</Label>
                    <Input id="points" type="number" placeholder="100" />
                  </div>
                  <Button className="w-full">Buat Tugas</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filter dan Search */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari tugas..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Daftar Tugas */}
        <div className="grid gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {user?.role === 'student' 
                        ? `${assignment.subject} - ${assignment.teacher}`
                        : `${assignment.class} - ${assignment.subject}`
                      }
                    </p>
                  </div>
                  {user?.role === 'student' && (
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status === 'submitted' ? 'Dikumpulkan' : 'Belum Dikumpulkan'}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {user?.role === 'student' && 'description' in assignment && (
                  <p className="text-gray-700">{assignment.description}</p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {assignment.points} Poin
                    </div>
                  </div>
                  
                  {user?.role === 'teacher' && 'submitted' in assignment && (
                    <div className="text-right">
                      <div className="font-medium">
                        {assignment.submitted}/{assignment.total} Dikumpulkan
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((assignment.submitted / assignment.total) * 100)}% Selesai
                      </div>
                    </div>
                  )}
                </div>

                {user?.role === 'student' && 'submittedAt' in assignment && assignment.submittedAt && (
                  <div className="text-sm text-green-600">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Dikumpulkan pada: {new Date(assignment.submittedAt).toLocaleDateString('id-ID')}
                  </div>
                )}

                <div className="flex space-x-2">
                  {user?.role === 'student' ? (
                    <>
                      <Button className="flex-1">Lihat Detail</Button>
                      {assignment.status === 'pending' && (
                        <Button variant="outline">Kumpulkan Tugas</Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button>Lihat Pengumpulan</Button>
                      <Button variant="outline">Edit Tugas</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
