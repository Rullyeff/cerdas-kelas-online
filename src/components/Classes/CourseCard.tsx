
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, Calendar, FileText, MessageSquare } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: number;
    name: string;
    code: string;
    teacher: string;
    semester: string;
    students: number;
    assignments: number;
    announcements: number;
    nextClass?: string;
    color: string;
  };
  userRole: string;
  onEnterCourse: (courseId: number) => void;
}

const CourseCard = ({ course, userRole, onEnterCourse }: CourseCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      <CardHeader 
        className={`${course.color} text-white relative overflow-hidden`}
        onClick={() => onEnterCourse(course.id)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{course.name}</h3>
            <p className="text-sm opacity-90">{course.code}</p>
            {userRole === 'student' && (
              <p className="text-xs opacity-80 mt-1">Instructor: {course.teacher}</p>
            )}
          </div>
          <BookOpen className="h-6 w-6 opacity-80" />
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10">
          <BookOpen className="h-24 w-24" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <Badge variant="secondary" className="text-xs">
              {course.semester}
            </Badge>
            {course.nextClass && (
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">{course.nextClass}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-blue-600 mb-1" />
              <span className="text-xs text-gray-600">Students</span>
              <span className="font-semibold text-sm">{course.students}</span>
            </div>
            <div className="flex flex-col items-center">
              <FileText className="h-5 w-5 text-green-600 mb-1" />
              <span className="text-xs text-gray-600">Assignments</span>
              <span className="font-semibold text-sm">{course.assignments}</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquare className="h-5 w-5 text-purple-600 mb-1" />
              <span className="text-xs text-gray-600">Updates</span>
              <span className="font-semibold text-sm">{course.announcements}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onEnterCourse(course.id)}
            >
              Enter Course
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
