
import React, { useState } from 'react';
import { useQuestionBank } from '@/contexts/QuestionBankContext';
import QuestionBankHeader from './QuestionBankHeader';
import QuestionSearch from './QuestionSearch';
import QuestionList from './QuestionList';

const QuestionBank = () => {
  const { questions, deleteQuestion } = useQuestionBank();
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredQuestions = questions.filter(question => 
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <QuestionBankHeader onExport={exportQuestions} />
      <QuestionSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <QuestionList questions={filteredQuestions} onDeleteQuestion={deleteQuestion} />
    </div>
  );
};

export default QuestionBank;
