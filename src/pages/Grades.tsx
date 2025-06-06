
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Award, FileText, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Grades = () => {
  const { user } = useAuth();

  const studentGrades = [
    {
      id: 1,
      subject: 'Matematika',
      teacher: 'Dr. Sarah Wijaya',
      assignments: [
        { name: 'Tugas Integral', score: 85, maxScore: 100, date: '2024-03-01', type: 'assignment' },
        { name: 'Quiz Limit', score: 90, maxScore: 100, date: '2024-03-05', type: 'quiz' },
        { name: 'UTS', score: 88, maxScore: 100, date: '2024-03-10', type: 'exam' }
      ],
      average: 87.7,
      grade: 'A'
    },
    {
      id: 2,
      subject: 'Fisika',
      teacher: 'Prof. Ahmad Rahman',
      assignments: [
        { name: 'Laporan Praktikum', score: 82, maxScore: 100, date: '2024-03-02', type: 'assignment' },
        { name: 'Quiz Newton', score: 85, maxScore: 100, date: '2024-03-06', type: 'quiz' },
        { name: 'UTS', score: 80, maxScore: 100, date: '2024-03-11', type: 'exam' }
      ],
      average: 82.3,
      grade: 'B+'
    },
    {
      id: 3,
      subject: 'Kimia',
      teacher: 'Dr. Maya Sari',
      assignments: [
        { name: 'Tugas Molekul', score: 92, maxScore: 100, date: '2024-03-03', type: 'assignment' },
        { name: 'Quiz Atom', score: 88, maxScore: 100, date: '2024-03-07', type: 'quiz' }
      ],
      average: 90.0,
      grade: 'A'
    }
  ];

  const teacherGrades = [
    {
      id: 1,
      class: 'XII IPA 1',
      subject: 'Matematika',
      students: 32,
      assignments: [
        { name: 'Tugas Integral', avgScore: 82.5, submissions: 30 },
        { name: 'Quiz Limit', avgScore: 85.2, submissions: 32 },
        { name: 'UTS', avgScore: 78.8, submissions: 32 }
      ],
      classAverage: 82.2
    },
    {
      id: 2,
      class: 'XII IPA 2',
      subject: 'Matematika',
      students: 30,
      assignments: [
        { name: 'Tugas Integral', avgScore: 79.3, submissions: 28 },
        { name: 'Quiz Limit', avgScore: 81.7, submissions: 30 }
      ],
      classAverage: 80.5
    }
  ];

  const progressData = [
    { month: 'Jan', matematika: 85, fisika: 80, kimia: 88 },
    { month: 'Feb', matematika: 87, fisika: 82, kimia: 90 },
    { month: 'Mar', matematika: 88, fisika: 83, kimia: 90 },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B+': case 'B': return 'bg-blue-100 text-blue-800';
      case 'C+': case 'C': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <FileText className="h-4 w-4" />;
      case 'quiz': return <Award className="h-4 w-4" />;
      case 'exam': return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.role === 'student' ? 'Nilai & Rapor' : 'Penilaian Siswa'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'student' 
              ? 'Lihat progress akademik dan nilai Anda'
              : 'Kelola dan pantau nilai siswa'
            }
          </p>
        </div>

        {user?.role === 'student' ? (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Ringkasan</TabsTrigger>
              <TabsTrigger value="subjects">Per Mata Pelajaran</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Statistik Umum */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Rata-rata Keseluruhan</p>
                        <p className="text-3xl font-bold text-gray-900">86.7</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">+2.3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Nilai Tertinggi</p>
                        <p className="text-3xl font-bold text-gray-900">92</p>
                      </div>
                      <Award className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Peringkat Kelas</p>
                        <p className="text-3xl font-bold text-gray-900">5</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">dari 32 siswa</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ringkasan per Mata Pelajaran */}
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Nilai per Mata Pelajaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentGrades.map((subject) => (
                      <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{subject.subject}</div>
                          <div className="text-sm text-gray-600">{subject.teacher}</div>
                        </div>
                        <div className="text-center mr-4">
                          <div className="text-2xl font-bold">{subject.average}</div>
                          <div className="text-sm text-gray-600">Rata-rata</div>
                        </div>
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-6">
              {studentGrades.map((subject) => (
                <Card key={subject.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{subject.subject}</CardTitle>
                        <p className="text-sm text-gray-600">{subject.teacher}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{subject.average}</div>
                        <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {subject.assignments.map((assignment, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(assignment.type)}
                            <div>
                              <div className="font-medium text-sm">{assignment.name}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(assignment.date).toLocaleDateString('id-ID')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {assignment.score}/{assignment.maxScore}
                            </div>
                            <div className="text-sm text-gray-600">
                              {Math.round((assignment.score / assignment.maxScore) * 100)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Nilai Bulanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="matematika" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="fisika" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="kimia" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* Teacher View */
          <div className="space-y-6">
            <div className="flex space-x-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelas</SelectItem>
                  <SelectItem value="xii-ipa-1">XII IPA 1</SelectItem>
                  <SelectItem value="xii-ipa-2">XII IPA 2</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Cari siswa..." className="flex-1" />
            </div>

            {teacherGrades.map((classData) => (
              <Card key={classData.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{classData.class} - {classData.subject}</CardTitle>
                      <p className="text-sm text-gray-600">{classData.students} siswa</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{classData.classAverage}</div>
                      <div className="text-sm text-gray-600">Rata-rata Kelas</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classData.assignments.map((assignment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{assignment.name}</div>
                          <div className="text-sm text-gray-600">
                            {assignment.submissions} dari {classData.students} siswa
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{assignment.avgScore}</div>
                          <div className="text-sm text-gray-600">Rata-rata</div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-4">
                          Detail
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Grades;
