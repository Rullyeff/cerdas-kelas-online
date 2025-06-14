
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, Plus, Mail, Phone, MoreHorizontal, UserPlus } from 'lucide-react';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Simulasi daftar siswa terdaftar oleh admin
  const availableStudents = [
    {
      id: 1,
      name: 'Ahmad Rizky Pratama',
      nis: '2024001',
      class: 'XII IPA 1',
      email: 'ahmad.rizky@student.com',
      phone: '081234567890',
      status: 'active',
      average: 88.5,
      attendance: 95
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      nis: '2024002',
      class: 'XII IPA 1',
      email: 'siti.nur@student.com',
      phone: '081234567891',
      status: 'active',
      average: 92.3,
      attendance: 98
    },
    {
      id: 3,
      name: 'Budi Santoso',
      nis: '2024003',
      class: 'XII IPA 2',
      email: 'budi.santoso@student.com',
      phone: '081234567892',
      status: 'inactive',
      average: 75.8,
      attendance: 85
    },
    {
      id: 4,
      name: 'Maya Dewi',
      nis: '2024004',
      class: 'XI IPA 1',
      email: 'maya.dewi@student.com',
      phone: '081234567893',
      status: 'active',
      average: 89.7,
      attendance: 92
    }
  ];

  // Simulasi siswa yang SUDAH diasign ke kelas yang diampu guru
  const [assignedStudents, setAssignedStudents] = useState<number[]>([1,2,3,4]);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | "">(availableStudents.length > 0 ? availableStudents[0].id : "");

  const handleAssignStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || assignedStudents.includes(Number(selectedStudentId))) return;
    setAssignedStudents(prev => [...prev, Number(selectedStudentId)]);
    setOpenAssignDialog(false);
    setSelectedStudentId(""); // optional: reset
  };

  const students = availableStudents.filter(stu => assignedStudents.includes(stu.id));

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-50 text-green-700 border-green-200'
      : 'bg-red-50 text-red-800 border-red-200';
  };

  const getGradeColor = (average: number) => {
    if (average >= 90) return 'text-green-600';
    if (average >= 80) return 'text-primary';
    if (average >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Manajemen Siswa</h1>
            <p className="text-muted-foreground">Kelola data siswa dan pantau progress belajar mereka</p>
          </div>
          <Dialog open={openAssignDialog} onOpenChange={setOpenAssignDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Tambah Siswa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Siswa ke Kelas</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleAssignStudent}>
                <div>
                  <Label htmlFor="student">Pilih Siswa</Label>
                  <select
                    id="student"
                    value={selectedStudentId}
                    onChange={e => setSelectedStudentId(Number(e.target.value))}
                    className="w-full border rounded px-3 py-2 mt-1"
                  >
                    <option value="">-- Pilih Siswa Terdaftar --</option>
                    {availableStudents
                      .filter(stu => !assignedStudents.includes(stu.id))
                      .map((stu) => (
                        <option key={stu.id} value={stu.id}>
                          {stu.name} ({stu.nis})
                        </option>
                      ))}
                  </select>
                </div>
                <Button className="w-full" type="submit" disabled={!selectedStudentId}>
                  Assign ke Kelas
                </Button>
              </form>
              <div className="text-xs text-gray-500 mt-2">
                Siswa harus sudah terdaftar oleh admin untuk bisa di-assign ke kelas.
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter dan Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari siswa berdasarkan nama atau NIS..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex-shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filter Kelas
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <Card>
            <CardContent className="p-5">
              <div className="text-2xl font-bold text-primary">{students.length}</div>
              <p className="text-sm text-muted-foreground">Total Siswa</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="text-2xl font-bold text-green-600">
                {students.filter(s => s.status === 'active').length}
              </div>
              <p className="text-sm text-muted-foreground">Siswa Aktif</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="text-2xl font-bold text-yellow-600">
                {(students.reduce((acc, s) => acc + s.average, 0) / students.length).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">Rata-rata Nilai</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="text-2xl font-bold text-purple-600">
                {(students.reduce((acc, s) => acc + s.attendance, 0) / students.length).toFixed(0)}%
              </div>
              <p className="text-sm text-muted-foreground">Rata-rata Kehadiran</p>
            </CardContent>
          </Card>
        </div>

        {/* Daftar Siswa */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border bg-white rounded-xl hover:bg-muted/60 gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-lg">{student.name}</div>
                      <div className="text-xs text-muted-foreground">NIS: {student.nis}</div>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-1" />
                          {student.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 mr-1" />
                          {student.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">{student.class}</div>
                      <div className={`text-sm font-bold ${getGradeColor(student.average)}`}>
                        Rata-rata: {student.average}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Kehadiran: {student.attendance}%
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(student.status)} border px-3 py-0.5 rounded-xl`}>
                      {student.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </Badge>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Students;
