
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Plus, Upload } from 'lucide-react';
import CreateQuestionDialog from './CreateQuestionDialog';
import ImportQuestionDialog from './ImportQuestionDialog';

interface QuestionBankHeaderProps {
  onExport: () => void;
}

const QuestionBankHeader = ({ onExport }: QuestionBankHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Soal</h2>
        <p className="text-gray-600">Kelola koleksi soal untuk ujian dan kuis</p>
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
