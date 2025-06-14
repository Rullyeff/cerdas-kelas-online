
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, X, Check } from 'lucide-react';

interface AssignmentSubmissionProps {
  assignmentId: number;
  assignmentTitle: string;
  dueDate: string;
  onSubmit: (submission: any) => void;
}

const AssignmentSubmission = ({ assignmentId, assignmentTitle, dueDate, onSubmit }: AssignmentSubmissionProps) => {
  const [submissionText, setSubmissionText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const submission = {
      assignmentId,
      text: submissionText,
      files: attachedFiles,
      submittedAt: new Date().toISOString()
    };

    // Simulate submission delay
    setTimeout(() => {
      onSubmit(submission);
      setIsSubmitting(false);
      setSubmissionText('');
      setAttachedFiles([]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-800">Submit Assignment</CardTitle>
        <p className="text-sm text-blue-600">{assignmentTitle}</p>
        <p className="text-xs text-gray-600">Due: {new Date(dueDate).toLocaleDateString('id-ID')}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Label htmlFor="submission-text" className="text-base font-medium">
            Submission Text
          </Label>
          <Textarea
            id="submission-text"
            placeholder="Type your submission here or attach files below..."
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            rows={8}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-base font-medium">Attach Files</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.ppt,.pptx"
              />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-500"
              >
                Click to upload files
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, PPT, PPTX
              </p>
            </div>
          </div>
        </div>

        {attachedFiles.length > 0 && (
          <div>
            <Label className="text-base font-medium">Attached Files</Label>
            <div className="mt-2 space-y-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline">Save Draft</Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || (!submissionText.trim() && attachedFiles.length === 0)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Submit Assignment
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentSubmission;
