
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

const ImportQuestionDialog = () => {
  return (
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
  );
};

export default ImportQuestionDialog;
