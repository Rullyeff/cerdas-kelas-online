
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import QuestionBank from '@/components/QuestionBank/QuestionBank';
import CreateExamDialog from '@/components/Exams/CreateExamDialog';
import ExamsList from '@/components/Exams/ExamsList';

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
          {user?.role === 'teacher' && <CreateExamDialog />}
        </div>

        {user?.role === 'teacher' ? (
          <Tabs defaultValue="exams" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="exams">Daftar Ujian</TabsTrigger>
              <TabsTrigger value="questions">Bank Soal</TabsTrigger>
            </TabsList>
            <TabsContent value="exams" className="space-y-6">
              <ExamsList exams={exams} userRole={user?.role} />
            </TabsContent>
            <TabsContent value="questions">
              <QuestionBank />
            </TabsContent>
          </Tabs>
        ) : (
          <ExamsList exams={exams} userRole={user?.role} />
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
