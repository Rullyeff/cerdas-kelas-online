
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Question {
  id: number;
  question: string;
  type: 'multiple_choice' | 'essay';
  subject: string;
  options?: string[];
  correctAnswer?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdBy?: string;
}

interface QuestionBankContextType {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id'>) => void;
  updateQuestion: (id: number, question: Partial<Question>) => void;
  deleteQuestion: (id: number) => void;
  getQuestionsBySubject: (subject: string) => Question[];
}

const QuestionBankContext = createContext<QuestionBankContextType | undefined>(undefined);

export const QuestionBankProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: 'Berapa hasil dari 2 + 2?',
      type: 'multiple_choice',
      subject: 'Matematika',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      difficulty: 'easy',
      createdBy: 'Dr. Sarah Wijaya'
    },
    {
      id: 2,
      question: 'Jelaskan hukum Newton yang pertama!',
      type: 'essay',
      subject: 'Fisika',
      difficulty: 'medium',
      createdBy: 'Prof. Ahmad Rahman'
    },
    {
      id: 3,
      question: 'Apa itu fotosintesis?',
      type: 'essay',
      subject: 'Biologi',
      difficulty: 'easy',
      createdBy: 'Dr. Maya Sari'
    }
  ]);

  const addQuestion = (questionData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: questions.length + 1
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const updateQuestion = (id: number, questionData: Partial<Question>) => {
    setQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, ...questionData } : q)
    );
  };

  const deleteQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const getQuestionsBySubject = (subject: string) => {
    return questions.filter(q => q.subject.toLowerCase().includes(subject.toLowerCase()));
  };

  return (
    <QuestionBankContext.Provider value={{
      questions,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      getQuestionsBySubject
    }}>
      {children}
    </QuestionBankContext.Provider>
  );
};

export const useQuestionBank = () => {
  const context = useContext(QuestionBankContext);
  if (context === undefined) {
    throw new Error('useQuestionBank must be used within a QuestionBankProvider');
  }
  return context;
};
