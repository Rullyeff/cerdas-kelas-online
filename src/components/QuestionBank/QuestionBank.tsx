
import React, { useState, useMemo } from 'react';
import { useQuestionBank } from '@/contexts/QuestionBankContext';
import QuestionBankHeader from './QuestionBankHeader';
import QuestionSearch from './QuestionSearch';
import QuestionList from './QuestionList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const QuestionBank = () => {
  const { questions, deleteQuestion } = useQuestionBank();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const exportQuestions = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bank_soal.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Dapatkan daftar mata pelajaran unik
  const subjects = useMemo(() => {
    const set = new Set<string>();
    questions.forEach(q => set.add(q.subject));
    return Array.from(set);
  }, [questions]);

  // Filter soal berdasarkan search atau subject terpilih
  const filteredQuestions = useMemo(() => {
    let list = questions;
    if (selectedSubject !== 'all') {
      list = list.filter(q => q.subject === selectedSubject);
    }
    if (searchTerm.trim() !== '') {
      list = list.filter(question =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return list;
  }, [questions, selectedSubject, searchTerm]);

  return (
    <div className="space-y-6">
      <QuestionBankHeader onExport={exportQuestions} />
      <QuestionSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="w-full">
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="all">Semua</TabsTrigger>
          {subjects.map((subject) => (
            <TabsTrigger key={subject} value={subject}>{subject}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedSubject} className="space-y-6" forceMount>
          <QuestionList questions={filteredQuestions} onDeleteQuestion={deleteQuestion} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionBank;

