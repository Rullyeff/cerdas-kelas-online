
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const CreateExamDialog = () => {
  const [examData, setExamData] = useState({
    title: '',
    date: '',
    time: '',
    duration: ''
  });

  const handleSubmit = () => {
    console.log('Creating exam:', examData);
    // Handle exam creation logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Buat Ujian Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Buat Ujian Baru</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
          <Button className="w-full" onClick={handleSubmit}>Buat Ujian</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
