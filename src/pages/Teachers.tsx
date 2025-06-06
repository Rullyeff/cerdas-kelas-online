
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, Plus, Mail, Phone, BookOpen, Users, UserPlus } from 'lucide-react';

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Wijaya',
      nip: 'T001',
      subject: 'Matematika',
      email: 'sarah.wijaya@school.com',
      phone: '081234567890',
      status: 'active',
      classes: ['XII IPA 1', 'XII IPA 2', 'XI IPA 1'],
      students: 90,
      experience: '15 tahun'
    },
    {
      id: 2,
      name: 'Prof. Ahmad Rahman',
      nip: 'T002',
      subject: 'Fisika',
      email: 'ahmad.rahman@school.com',
      phone: '081234567891',
      status: 'active',
      classes: ['XII IPA 1', 'XI IPA 2'],
      students: 60,
      experience: '20 tahun'
    },
    {
      id: 3,
      name: 'Dr. Maya Sari',
      nip: 'T003',
      subject: 'Sejarah',
      email: 'maya.sari@school.com',
      phone: '081234567892',
      status: 'active',
      classes: ['XII IPS 1', 'XI IPS 1'],
      students: 65,
      experience: '12 tahun'
    },
    {
      id: 4,
      name: 'Drs. Budi Hartono',
      nip: 'T004',
      subject: 'Bahasa Indonesia',
      email: 'budi.hartono@school.com',
      phone: '081234567893',
      status: 'inactive',
      classes: ['XII IPA 3'],
      students: 30,
      experience: '25 tahun'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Guru</h1>
            <p className="text-gray-600">Kelola data guru dan pantau aktivitas mengajar</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Tambah Guru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Guru Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <Label htmlFor="nip">NIP</Label>
                  <Input id="nip" placeholder="Nomor Induk Pegawai" />
                </div>
                <div>
                  <Label htmlFor="subject">Mata Pelajaran</Label>
                  <Input id="subject" placeholder="Matematika" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@school.com" />
                </div>
                <div>
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input id="phone" placeholder="081234567890" />
                </div>
                <Button className="w-full">Tambah Guru</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter dan Search */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari guru berdasarkan nama atau mata pelajaran..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter Status
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{teachers.length}</div>
              <p className="text-sm text-gray-600">Total Guru</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {teachers.filter(t => t.status === 'active').length}
              </div>
              <p className="text-sm text-gray-600">Guru Aktif</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {teachers.reduce((acc, t) => acc + t.classes.length, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Kelas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                {teachers.reduce((acc, t) => acc + t.students, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Siswa Diajar</p>
            </CardContent>
          </Card>
        </div>

        {/* Daftar Guru */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Guru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-lg">{teacher.name}</div>
                      <div className="text-sm text-gray-600">NIP: {teacher.nip}</div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-1" />
                          {teacher.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-1" />
                          {teacher.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center text-sm font-medium text-blue-600">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {teacher.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{teacher.experience}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center text-sm font-medium text-green-600">
                        <Users className="h-4 w-4 mr-1" />
                        {teacher.students} Siswa
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{teacher.classes.length} Kelas</div>
                    </div>
                    <div className="text-center">
                      <Badge className={getStatusColor(teacher.status)}>
                        {teacher.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          Kelola
                        </Button>
                      </div>
                    </div>
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

export default Teachers;
