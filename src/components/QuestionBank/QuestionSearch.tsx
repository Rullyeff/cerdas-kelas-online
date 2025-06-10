
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface QuestionSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const QuestionSearch = ({ searchTerm, onSearchChange }: QuestionSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input 
        placeholder="Cari soal..." 
        className="pl-10" 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default QuestionSearch;
