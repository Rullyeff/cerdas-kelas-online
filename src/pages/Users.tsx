
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, Plus, Mail, Shield, MoreHorizontal, UserPlus, Eye, Edit, Trash2 } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Ahmad Rizky Pratama',
      email: 'ahmad.rizky@student.com',
      role: 'student',
      status: 'active',
      lastLogin: '2024-03-15 14:30',
      joinDate: '2024-01-15',
      class: 'XII IPA 1'
    },
    {
      id: 2,
      name: 'Dr. Sarah Wijaya',
      email: 'sarah.wijaya@teacher.com',
      role: 'teacher',
      status: 'active',
      lastLogin: '2024-03-15 16:45',
      joinDate: '2023-08-01',
      subject: 'Matematika'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.santoso@admin.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-03-15 10:15',
      joinDate: '2023-06-01'
    },
    {
      id: 4,
      name: 'Siti Nurhaliza',
      email: 'siti.nur@student.com',
      role: 'student',
      status: 'inactive',
      lastLogin: '2024-03-10 09:20',
      joinDate: '2024-01-15',
      class: 'XII IPA 1'
    },
    {
      id: 5,
      name: 'Prof. Ahmad Rahman',
      email: 'ahmad.rahman@teacher.com',
      role: 'teacher',
      status: 'active',
      lastLogin: '2024-03-15 13:00',
      joinDate: '2023-07-15',
      subject: 'Fisika'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'teacher': return 'Guru';
      case 'student': return 'Siswa';
      default: return role;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen User</h1>
            <p className="text-gray-600">Kelola semua pengguna sistem dan kontrol akses</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Tambah User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@domain.com" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select id="role" className="w-full p-2 border rounded-md">
                    <option value="student">Siswa</option>
                    <option value="teacher">Guru</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Password sementara" />
                </div>
                <Button className="w-full">Tambah User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter dan Search */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari user berdasarkan nama atau email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border rounded-md"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Guru</option>
            <option value="student">Siswa</option>
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter Lainnya
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <p className="text-sm text-gray-600">Total User</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </div>
              <p className="text-sm text-gray-600">User Aktif</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.role === 'teacher').length}
              </div>
              <p className="text-sm text-gray-600">Total Guru</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'student').length}
              </div>
              <p className="text-sm text-gray-600">Total Siswa</p>
            </CardContent>
          </Card>
        </div>

        {/* Daftar Users */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-lg">{user.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-1" />
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {user.class && `Kelas: ${user.class}`}
                        {user.subject && `Mata Pelajaran: ${user.subject}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <div className="text-gray-600">Bergabung: {new Date(user.joinDate).toLocaleDateString('id-ID')}</div>
                      <div className="text-gray-500">Login terakhir: {new Date(user.lastLogin).toLocaleString('id-ID')}</div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge className={getRoleColor(user.role)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {getRoleLabel(user.role)}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default Users;
