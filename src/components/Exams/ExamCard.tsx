
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Play } from 'lucide-react';

interface ExamCardProps {
  exam: any;
  userRole: string;
  onStartExam?: () => void;
  onViewDetails?: () => void;
  onEditExam?: () => void;
  onViewResults?: () => void;
}

const ExamCard = ({ exam, userRole, onStartExam, onViewDetails, onEditExam, onViewResults }: ExamCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'available': return 'Tersedia';
      case 'upcoming': return 'Akan Datang';
      default: return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{exam.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {userRole === 'student' 
                ? `${exam.subject} - ${exam.teacher}`
                : `${exam.class} - ${exam.subject}`
              }
            </p>
          </div>
          {userRole === 'student' && 'status' in exam && (
            <Badge className={getStatusColor(exam.status)}>
              {getStatusText(exam.status)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <div className="font-medium">Tanggal</div>
              <div className="text-gray-600">{new Date(exam.date).toLocaleDateString('id-ID')}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <div className="font-medium">Waktu</div>
              <div className="text-gray-600">{exam.time}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <div className="font-medium">
                {userRole === 'student' ? 'Soal' : 'Peserta'}
              </div>
              <div className="text-gray-600">
                {userRole === 'student' ? `${exam.questions} soal` : `${exam.participants} siswa`}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <div className="font-medium">Durasi</div>
              <div className="text-gray-600">{exam.duration} menit</div>
            </div>
          </div>
        </div>

        {userRole === 'student' && 'score' in exam && exam.score && (
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-800">
              Nilai Anda: {exam.score}/100
            </div>
          </div>
        )}

        {userRole === 'teacher' && 'completed' in exam && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">
              Progress: {exam.completed}/{exam.participants} siswa selesai
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(exam.completed / exam.participants) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          {userRole === 'student' ? (
            <>
              {exam.status === 'available' && (
                <Button className="flex-1" onClick={onStartExam}>
                  <Play className="h-4 w-4 mr-2" />
                  Mulai Ujian
                </Button>
              )}
              {exam.status === 'completed' && (
                <Button variant="outline" className="flex-1" onClick={onViewResults}>
                  Lihat Hasil
                </Button>
              )}
              {exam.status === 'upcoming' && (
                <Button variant="outline" className="flex-1" disabled>
                  Belum Tersedia
                </Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={onViewDetails}>Lihat Detail</Button>
              <Button variant="outline" onClick={onEditExam}>Edit Ujian</Button>
              <Button variant="outline" onClick={onViewResults}>Lihat Hasil</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamCard;
