
import React from 'react';
import { Question } from '@/contexts/QuestionBankContext';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  questions: Question[];
  onDeleteQuestion: (id: number) => void;
}

const QuestionList = ({ questions, onDeleteQuestion }: QuestionListProps) => {
  return (
    <div className="grid gap-4">
      {questions.map((question) => (
        <QuestionCard 
          key={question.id} 
          question={question} 
          onDelete={onDeleteQuestion}
        />
      ))}
    </div>
  );
};

export default QuestionList;
