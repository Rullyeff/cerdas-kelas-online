
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ExamCard from './ExamCard';

interface ExamsListProps {
  exams: any[];
  userRole: string;
}

const ExamsList = ({ exams, userRole }: ExamsListProps) => {
  return (
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
    </div>
  );
};

export default ExamsList;
