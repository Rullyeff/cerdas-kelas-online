
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useQuestionBank } from '@/contexts/QuestionBankContext';
import { useAuth } from '@/contexts/AuthContext';

const CreateQuestionDialog = () => {
  const { addQuestion } = useQuestionBank();
  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState<{
    question: string;
    type: 'multiple_choice' | 'essay';
    subject: string;
    options: string[];
    correctAnswer: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>({
    question: '',
    type: 'multiple_choice',
    subject: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    difficulty: 'easy'
  });

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.subject) return;
    
    addQuestion({
      ...newQuestion,
      createdBy: user?.name
    });
    
    setNewQuestion({
      question: '',
      type: 'multiple_choice',
      subject: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      difficulty: 'easy'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Buat Soal Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Buat Soal Baru</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="questionText">Pertanyaan</Label>
            <textarea
              id="questionText"
              className="w-full p-2 border rounded-md h-24"
              placeholder="Masukkan pertanyaan..."
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="questionType">Tipe Soal</Label>
              <select
                id="questionType"
                className="w-full p-2 border rounded-md"
                value={newQuestion.type}
                onChange={(e) => {
                  const value = e.target.value as 'multiple_choice' | 'essay';
                  setNewQuestion({...newQuestion, type: value});
                }}
              >
                <option value="multiple_choice">Pilihan Ganda</option>
                <option value="essay">Esai</option>
              </select>
            </div>
            <div>
              <Label htmlFor="questionSubject">Mata Pelajaran</Label>
              <Input
                id="questionSubject"
                placeholder="Matematika"
                value={newQuestion.subject}
                onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
              />
            </div>
          </div>
          {newQuestion.type === 'multiple_choice' && (
            <div>
              <Label>Pilihan Jawaban</Label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={newQuestion.correctAnswer === index}
                    onChange={() => setNewQuestion({...newQuestion, correctAnswer: index})}
                  />
                  <Input
                    placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion({...newQuestion, options: newOptions});
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <div>
            <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
            <select
              id="difficulty"
              className="w-full p-2 border rounded-md"
              value={newQuestion.difficulty}
              onChange={(e) => {
                const value = e.target.value as 'easy' | 'medium' | 'hard';
                setNewQuestion({...newQuestion, difficulty: value});
              }}
            >
              <option value="easy">Mudah</option>
              <option value="medium">Sedang</option>
              <option value="hard">Sulit</option>
            </select>
          </div>
          <Button onClick={handleAddQuestion} className="w-full">Simpan Soal</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionDialog;
