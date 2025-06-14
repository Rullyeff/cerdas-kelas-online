import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, BookOpen, Video, Edit, Trash2, Plus, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const defaultClassColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];

const initialTeacherClasses = [
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

// Daftar siswa terdaftar admin (dummy, sama dengan Students)
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

const Classes = () => {
  const { user } = useAuth();

  // Kelola kelas guru dalam state agar bisa tambah/edit/hapus lokal
  const [teacherClasses, setTeacherClasses] = useState(initialTeacherClasses);
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    students: 0,
    schedule: '',
    nextSession: '',
    assignments: 0,
    color: defaultClassColors[Math.floor(Math.random() * defaultClassColors.length)],
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [classStudentMap, setClassStudentMap] = useState<{ [classId: number]: number[] }>({
    1: [1, 2], // Default siswa per kelas
    2: [3],
    3: [4],
  });
  const [openAssignDialog, setOpenAssignDialog] = useState<{ open: boolean; classId: number | null }>({ open: false, classId: null });
  const [selectedStudentId, setSelectedStudentId] = useState<number | "">("");

  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      students: 0,
      schedule: '',
      nextSession: '',
      assignments: 0,
      color: defaultClassColors[Math.floor(Math.random() * defaultClassColors.length)],
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsEdit(false);
    setOpenForm(true);
  };

  const handleOpenEdit = (kelas: typeof teacherClasses[0]) => {
    setFormData(kelas);
    setIsEdit(true);
    setOpenForm(true);
  };

  // Updated handleChange to accept both input and select events
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'students' || name === 'assignments'
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      setTeacherClasses((prev) =>
        prev.map((kelas) => kelas.id === formData.id ? { ...formData } : kelas)
      );
    } else {
      const newId = Math.max(...teacherClasses.map(k => k.id), 0) + 1;
      setTeacherClasses((prev) => [
        ...prev,
        { ...formData, id: newId },
      ]);
    }
    setOpenForm(false);
    resetForm();
  };

  const handleOpenDelete = (id: number) => setDeleteId(id);
  const handleCloseDelete = () => setDeleteId(null);

  const handleDelete = () => {
    setTeacherClasses(prev => prev.filter(kelas => kelas.id !== deleteId));
    setDeleteId(null);
  };

  const handleOpenAssign = (classId: number) => {
    setOpenAssignDialog({ open: true, classId });
    setSelectedStudentId("");
  };
  const handleCloseAssign = () => setOpenAssignDialog({ open: false, classId: null });

  const handleAssignStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const classId = openAssignDialog.classId;
    if (!classId || !selectedStudentId) return;
    setClassStudentMap((prev) => {
      const curr = prev[classId] || [];
      if (curr.includes(Number(selectedStudentId))) return prev;
      return { ...prev, [classId]: [...curr, Number(selectedStudentId)] };
    });
    handleCloseAssign();
  };

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
            <Button onClick={handleOpenAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Buat Kelas Baru
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow relative">
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
                  <p className="text-sm text-gray-600">{(classItem as any).teacher}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
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
                      <span>{(classItem as any).progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(classItem as any).progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {user?.role === 'teacher' && 'assignments' in classItem && (
                  <div className="text-sm text-gray-600">
                    {classItem.assignments} tugas aktif
                  </div>
                )}

                <div className="flex items-end justify-between mt-6">
                  {/* Aksi utama (Gabung Kelas & Detail)—rata kiri */}
                  <div className="flex flex-1 gap-2">
                    <Button className="flex-1" variant="default">
                      <Video className="h-4 w-4 mr-2" />
                      Gabung Kelas
                    </Button>
                    <Button variant="outline" size="icon">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Aksi sekunder (Tambah Siswa, Edit, Delete)—rata kanan, vertical stack */}
                  {user?.role === 'teacher' && (
                    <div className="flex flex-col gap-2 ml-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleOpenAssign(classItem.id)}
                        title="Tambah Siswa"
                        className="border-green-500 hover:bg-green-100 hover:border-green-600"
                      >
                        <UserPlus className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleOpenEdit(classItem)}
                        title="Edit"
                        className="border-gray-400 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleOpenDelete(classItem.id)}
                        title="Hapus"
                        className="border-red-400 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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

        {/* Dialog Assign Siswa per kelas */}
        <Dialog open={openAssignDialog.open} onOpenChange={handleCloseAssign}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Siswa ke Kelas</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleAssignStudent}>
              <div>
                <Label htmlFor="student">Pilih Siswa Terdaftar</Label>
                <select
                  id="student"
                  value={selectedStudentId}
                  onChange={e => setSelectedStudentId(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option value="">-- Pilih Siswa --</option>
                  {availableStudents
                    .filter(stu =>
                      !classStudentMap[openAssignDialog.classId || 0]?.includes(stu.id)
                    )
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
          </DialogContent>
        </Dialog>

        {/* Dialog Tambah/Edit */}
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Kelas" : "Tambah Kelas Baru"}</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Nama Kelas</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Misal: XII IPA 4 - Matematika"
                  required
                />
              </div>
              <div>
                <Label htmlFor="students">Jumlah Siswa</Label>
                <Input
                  id="students"
                  name="students"
                  type="number"
                  value={formData.students}
                  onChange={handleChange}
                  placeholder="Contoh: 35"
                  min={0}
                  required
                />
              </div>
              <div>
                <Label htmlFor="schedule">Jadwal</Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  placeholder="Misal: Senin, Rabu 08:00-09:30"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nextSession">Sesi Berikutnya</Label>
                <Input
                  id="nextSession"
                  name="nextSession"
                  value={formData.nextSession}
                  onChange={handleChange}
                  placeholder="Misal: Selasa 10:00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="assignments">Jumlah Tugas Aktif</Label>
                <Input
                  id="assignments"
                  name="assignments"
                  type="number"
                  value={formData.assignments}
                  onChange={handleChange}
                  placeholder="Contoh: 4"
                  min={0}
                  required
                />
              </div>
              <div>
                <Label htmlFor="color">Warna Kelas</Label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full h-10 p-2 rounded-md border"
                >
                  {defaultClassColors.map(c => (
                    <option key={c} value={c}>{c.replace('bg-', '').replace('-500', '').toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setOpenForm(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {isEdit ? "Simpan" : "Tambah"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog Hapus */}
        <AlertDialog open={deleteId !== null} onOpenChange={handleCloseDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Kelas?</AlertDialogTitle>
              <AlertDialogDescription>
                Yakin ingin menghapus kelas ini? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Classes;
