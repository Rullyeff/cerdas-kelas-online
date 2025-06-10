
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Question } from '@/contexts/QuestionBankContext';

interface QuestionCardProps {
  question: Question;
  onDelete: (id: number) => void;
}

const QuestionCard = ({ question, onDelete }: QuestionCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
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
              onClick={() => onDelete(question.id)}
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
  );
};

export default QuestionCard;
