
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Upload, Download, Edit, Trash2 } from 'lucide-react';
import { useQuestionBank } from '@/contexts/QuestionBankContext';
import { useAuth } from '@/contexts/AuthContext';

const QuestionBank = () => {
  const { questions, addQuestion, deleteQuestion } = useQuestionBank();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'multiple_choice' as const,
    subject: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    difficulty: 'easy' as const
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuestions = questions.filter(question => 
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Soal</h2>
          <p className="text-gray-600">Kelola koleksi soal untuk ujian dan kuis</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportQuestions}>
            <Download className="h-4 w-4 mr-2" />
            Ekspor Soal
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Impor Soal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Impor Soal dari File JSON</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="questionFile">File JSON</Label>
                  <Input id="questionFile" type="file" accept=".json" />
                </div>
                <Button className="w-full">Impor Soal</Button>
              </div>
            </DialogContent>
          </Dialog>
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
                      onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value as 'multiple_choice' | 'essay'})}
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
                    onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value as 'easy' | 'medium' | 'hard'})}
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
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Cari soal..." 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Questions List */}
      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{question.question}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{question.subject}</Badge>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty === 'easy' ? 'Mudah' : 
                       question.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                    </Badge>
                    <Badge variant="secondary">
                      {question.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Esai'}
                    </Badge>
                    {question.createdBy && (
                      <Badge variant="outline">Oleh: {question.createdBy}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {question.type === 'multiple_choice' && question.options && (
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {question.options.map((option, index) => (
                    <div key={index} className={`p-2 rounded text-sm ${
                      question.correctAnswer === index ? 'bg-green-100 text-green-800' : 'bg-gray-50'
                    }`}>
                      {String.fromCharCode(65 + index)}. {option}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
