
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Plus, Upload } from 'lucide-react';
import CreateQuestionDialog from './CreateQuestionDialog';
import ImportQuestionDialog from './ImportQuestionDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuestionBankHeaderProps {
  onExport: () => void;
  subjectList?: string[];
  selectedSubject?: string;
  onSubjectChange?: (value: string) => void;
}

const QuestionBankHeader = ({
  onExport,
  subjectList = [],
  selectedSubject = '',
  onSubjectChange = () => {},
}: QuestionBankHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Soal</h2>
        <p className="text-gray-600">Kelola koleksi soal untuk ujian dan kuis</p>
        {/* Mata Pelajaran Dropdown */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-800 mb-1">Mata Pelajaran</label>
          <div className="w-64">
            <Select value={selectedSubject} onValueChange={onSubjectChange}>
              <SelectTrigger
                className="border-2 border-green-600 rounded-lg focus:ring-green-600 focus:border-green-700 focus:outline-green-600 bg-white"
              >
                <SelectValue placeholder="Pilih Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white">
                {subjectList.map(subject => (
                  <SelectItem value={subject} key={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Ekspor Soal
        </Button>
        <ImportQuestionDialog />
        <CreateQuestionDialog />
      </div>
    </div>
  );
};

export default QuestionBankHeader;
