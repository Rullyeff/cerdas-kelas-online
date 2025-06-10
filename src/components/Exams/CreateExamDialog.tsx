
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import { useQuestionBank } from '@/contexts/QuestionBankContext';

const CreateExamDialog = () => {
  const { questions, getQuestionsBySubject } = useQuestionBank();
  const [examData, setExamData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    subject: ''
  });
  
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    console.log('Creating exam:', {
      ...examData,
      selectedQuestions: selectedQuestions
    });
    // Handle exam creation logic here
  };

  const toggleQuestionSelection = (questionId: number) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const filteredQuestions = examData.subject 
    ? getQuestionsBySubject(examData.subject)
    : questions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Buat Ujian Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buat Ujian Baru</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Exam Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="examTitle">Judul Ujian</Label>
              <Input 
                id="examTitle" 
                placeholder="Masukkan judul ujian"
                value={examData.title}
                onChange={(e) => setExamData({...examData, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="examSubject">Mata Pelajaran</Label>
              <Input 
                id="examSubject" 
                placeholder="Matematika"
                value={examData.subject}
                onChange={(e) => setExamData({...examData, subject: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="examDate">Tanggal</Label>
              <Input 
                id="examDate" 
                type="date"
                value={examData.date}
                onChange={(e) => setExamData({...examData, date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="examTime">Waktu</Label>
              <Input 
                id="examTime" 
                type="time"
                value={examData.time}
                onChange={(e) => setExamData({...examData, time: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="duration">Durasi (menit)</Label>
              <Input 
                id="duration" 
                type="number" 
                placeholder="120"
                value={examData.duration}
                onChange={(e) => setExamData({...examData, duration: e.target.value})}
              />
            </div>
          </div>

          {/* Question Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Pilih Soal dari Bank Soal ({selectedQuestions.length} terpilih)
            </h3>
            
            {/* Search Questions */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Cari soal..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Questions List */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredQuestions.map((question) => (
                <Card 
                  key={question.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedQuestions.includes(question.id) 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleQuestionSelection(question.id)}
                >
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">
                          {question.question}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {question.subject}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {question.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Esai'}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {question.difficulty === 'easy' ? 'Mudah' : 
                             question.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                          </Badge>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.id)}
                        onChange={() => toggleQuestionSelection(question.id)}
                        className="ml-2"
                      />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={!examData.title || !examData.subject || selectedQuestions.length === 0}
          >
            Buat Ujian ({selectedQuestions.length} soal)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
