
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ExamCard from './ExamCard';

interface ExamsListProps {
  exams: any[];
  userRole: string;
}

const ExamsList = ({ exams, userRole }: ExamsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (exam.teacher && exam.teacher.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (exam.class && exam.class.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Filter dan Search */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Cari ujian..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Daftar Ujian */}
      <div className="grid gap-6">
        {filteredExams.map((exam) => (
          <ExamCard 
            key={exam.id} 
            exam={exam} 
            userRole={userRole}
            onStartExam={() => console.log('Start exam:', exam.id)}
            onViewDetails={() => console.log('View details:', exam.id)}
            onEditExam={() => console.log('Edit exam:', exam.id)}
            onViewResults={() => console.log('View results:', exam.id)}
          />
        ))}
      </div>

      {filteredExams.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          Tidak ditemukan ujian yang sesuai dengan pencarian "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default ExamsList;
