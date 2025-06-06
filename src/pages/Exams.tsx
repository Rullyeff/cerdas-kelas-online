import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Plus, Search, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import QuestionBank from '@/components/QuestionBank/QuestionBank';

const Exams = () => {
  const { user } = useAuth();

  const studentExams = [
    {
      id: 1,
      title: 'Ujian Tengah Semester - Matematika',
      subject: 'Matematika',
      teacher: 'Dr. Sarah Wijaya',
      date: '2024-03-20',
      time: '08:00 - 10:00',
      duration: 120,
      questions: 50,
      status: 'upcoming',
      type: 'multiple_choice'
    },
    {
      id: 2,
      title: 'Quiz Fisika - Hukum Newton',
      subject: 'Fisika',
      teacher: 'Prof. Ahmad Rahman',
      date: '2024-03-15',
      time: '10:00 - 10:30',
      duration: 30,
      questions: 15,
      status: 'available',
      type: 'multiple_choice'
    },
    {
      id: 3,
      title: 'Ulangan Harian Kimia',
      subject: 'Kimia',
      teacher: 'Dr. Maya Sari',
      date: '2024-03-10',
      time: '13:00 - 14:00',
      duration: 60,
      questions: 25,
      status: 'completed',
      score: 85,
      type: 'essay'
    }
  ];

  const teacherExams = [
    {
      id: 1,
      title: 'Ujian Tengah Semester',
      class: 'XII IPA 1',
      subject: 'Matematika',
      date: '2024-03-20',
      time: '08:00 - 10:00',
      duration: 120,
      questions: 50,
      participants: 32,
      completed: 0,
      type: 'multiple_choice'
    },
    {
      id: 2,
      title: 'Quiz Limit Fungsi',
      class: 'XI IPA 1',
      subject: 'Matematika',
      date: '2024-03-15',
      time: '10:00 - 10:30',
      duration: 30,
      questions: 15,
      participants: 28,
      completed: 25,
      type: 'multiple_choice'
    }
  ];

  const exams = user?.role === 'student' ? studentExams : teacherExams;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'available': return 'Tersedia';
      case 'upcoming': return 'Akan Datang';
      default: return 'Unknown';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.role === 'student' ? 'Ujian & Quiz' : 'Manajemen Ujian'}
            </h1>
            <p className="text-gray-600">
              {user?.role === 'student' 
                ? 'Ikuti ujian dan quiz yang tersedia'
                : 'Kelola ujian dan quiz untuk siswa'
              }
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Ujian Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Buat Ujian Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="examTitle">Judul Ujian</Label>
                    <Input id="examTitle" placeholder="Masukkan judul ujian" />
                  </div>
                  <div>
                    <Label htmlFor="examDate">Tanggal</Label>
                    <Input id="examDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="examTime">Waktu</Label>
                    <Input id="examTime" type="time" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Durasi (menit)</Label>
                    <Input id="duration" type="number" placeholder="120" />
                  </div>
                  <Button className="w-full">Buat Ujian</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {user?.role === 'teacher' ? (
          <Tabs defaultValue="exams" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="exams">Daftar Ujian</TabsTrigger>
              <TabsTrigger value="questions">Bank Soal</TabsTrigger>
            </TabsList>
            <TabsContent value="exams" className="space-y-6">
              {/* Filter dan Search */}
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Cari ujian..." className="pl-10" />
                </div>
              </div>

              {/* Daftar Ujian */}
              <div className="grid gap-6">
                {exams.map((exam) => (
                  <Card key={exam.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{exam.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {user?.role === 'student' 
                              ? `${exam.subject} - ${exam.teacher}`
                              : `${exam.class} - ${exam.subject}`
                            }
                          </p>
                        </div>
                        {user?.role === 'student' && 'status' in exam && (
                          <Badge className={getStatusColor(exam.status)}>
                            {getStatusText(exam.status)}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Tanggal</div>
                            <div className="text-gray-600">{new Date(exam.date).toLocaleDateString('id-ID')}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Waktu</div>
                            <div className="text-gray-600">{exam.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">
                              {user?.role === 'student' ? 'Soal' : 'Peserta'}
                            </div>
                            <div className="text-gray-600">
                              {user?.role === 'student' ? `${exam.questions} soal` : `${exam.participants} siswa`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Durasi</div>
                            <div className="text-gray-600">{exam.duration} menit</div>
                          </div>
                        </div>
                      </div>

                      {user?.role === 'student' && 'score' in exam && exam.score && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm font-medium text-green-800">
                            Nilai Anda: {exam.score}/100
                          </div>
                        </div>
                      )}

                      {user?.role === 'teacher' && 'completed' in exam && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-800">
                            Progress: {exam.completed}/{exam.participants} siswa selesai
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(exam.completed / exam.participants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {user?.role === 'student' ? (
                          <>
                            {exam.status === 'available' && (
                              <Button className="flex-1">
                                <Play className="h-4 w-4 mr-2" />
                                Mulai Ujian
                              </Button>
                            )}
                            {exam.status === 'completed' && (
                              <Button variant="outline" className="flex-1">
                                Lihat Hasil
                              </Button>
                            )}
                            {exam.status === 'upcoming' && (
                              <Button variant="outline" className="flex-1" disabled>
                                Belum Tersedia
                              </Button>
                            )}
                          </>
                        ) : (
                          <>
                            <Button>Lihat Detail</Button>
                            <Button variant="outline">Edit Ujian</Button>
                            <Button variant="outline">Lihat Hasil</Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="questions">
              <QuestionBank />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
            {/* Filter dan Search */}
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Cari ujian..." className="pl-10" />
              </div>
            </div>

            {/* Daftar Ujian */}
            <div className="grid gap-6">
              {exams.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {user?.role === 'student' 
                            ? `${exam.subject} - ${exam.teacher}`
                            : `${exam.class} - ${exam.subject}`
                          }
                        </p>
                      </div>
                      {user?.role === 'student' && 'status' in exam && (
                        <Badge className={getStatusColor(exam.status)}>
                          {getStatusText(exam.status)}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">Tanggal</div>
                          <div className="text-gray-600">{new Date(exam.date).toLocaleDateString('id-ID')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">Waktu</div>
                          <div className="text-gray-600">{exam.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">
                            {user?.role === 'student' ? 'Soal' : 'Peserta'}
                          </div>
                          <div className="text-gray-600">
                            {user?.role === 'student' ? `${exam.questions} soal` : `${exam.participants} siswa`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">Durasi</div>
                          <div className="text-gray-600">{exam.duration} menit</div>
                        </div>
                      </div>
                    </div>

                    {user?.role === 'student' && 'score' in exam && exam.score && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm font-medium text-green-800">
                          Nilai Anda: {exam.score}/100
                        </div>
                      </div>
                    )}

                    {user?.role === 'teacher' && 'completed' in exam && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-800">
                          Progress: {exam.completed}/{exam.participants} siswa selesai
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(exam.completed / exam.participants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {user?.role === 'student' ? (
                        <>
                          {exam.status === 'available' && (
                            <Button className="flex-1">
                              <Play className="h-4 w-4 mr-2" />
                              Mulai Ujian
                            </Button>
                          )}
                          {exam.status === 'completed' && (
                            <Button variant="outline" className="flex-1">
                              Lihat Hasil
                            </Button>
                          )}
                          {exam.status === 'upcoming' && (
                            <Button variant="outline" className="flex-1" disabled>
                              Belum Tersedia
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <Button>Lihat Detail</Button>
                          <Button variant="outline">Edit Ujian</Button>
                          <Button variant="outline">Lihat Hasil</Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Footer Copyright */}
        <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
          © 2024 Edukasi Anak Bangsa. Copyright by Ibrahim Rully Effendy
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Exams;
