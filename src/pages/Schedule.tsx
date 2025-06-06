
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, Video, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Schedule = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weeklySchedule = [
    {
      day: 'Senin',
      date: '2024-03-11',
      classes: [
        {
          time: '08:00 - 09:30',
          subject: 'Matematika',
          teacher: 'Dr. Sarah Wijaya',
          class: 'XII IPA 1',
          room: 'Virtual Room 1',
          type: 'online'
        },
        {
          time: '10:00 - 11:30',
          subject: 'Fisika',
          teacher: 'Prof. Ahmad Rahman',
          class: 'XII IPA 1',
          room: 'Lab Fisika',
          type: 'offline'
        }
      ]
    },
    {
      day: 'Selasa',
      date: '2024-03-12',
      classes: [
        {
          time: '08:00 - 09:30',
          subject: 'Kimia',
          teacher: 'Dr. Maya Sari',
          class: 'XII IPA 1',
          room: 'Lab Kimia',
          type: 'offline'
        },
        {
          time: '13:00 - 14:30',
          subject: 'Bahasa Indonesia',
          teacher: 'Ibu Siti',
          class: 'XII IPA 1',
          room: 'Ruang 201',
          type: 'offline'
        }
      ]
    },
    {
      day: 'Rabu',
      date: '2024-03-13',
      classes: [
        {
          time: '08:00 - 09:30',
          subject: 'Matematika',
          teacher: 'Dr. Sarah Wijaya',
          class: 'XII IPA 1',
          room: 'Virtual Room 1',
          type: 'online'
        },
        {
          time: '10:00 - 11:30',
          subject: 'Biologi',
          teacher: 'Dr. Andi',
          class: 'XII IPA 1',
          room: 'Lab Biologi',
          type: 'offline'
        }
      ]
    },
    {
      day: 'Kamis',
      date: '2024-03-14',
      classes: [
        {
          time: '08:00 - 09:30',
          subject: 'Fisika',
          teacher: 'Prof. Ahmad Rahman',
          class: 'XII IPA 1',
          room: 'Virtual Room 2',
          type: 'online'
        },
        {
          time: '13:00 - 14:30',
          subject: 'Sejarah',
          teacher: 'Pak Budi',
          class: 'XII IPA 1',
          room: 'Ruang 203',
          type: 'offline'
        }
      ]
    },
    {
      day: 'Jumat',
      date: '2024-03-15',
      classes: [
        {
          time: '08:00 - 09:30',
          subject: 'Kimia',
          teacher: 'Dr. Maya Sari',
          class: 'XII IPA 1',
          room: 'Virtual Room 3',
          type: 'online'
        }
      ]
    }
  ];

  const teacherSchedule = [
    {
      day: 'Senin',
      date: '2024-03-11',
      classes: [
        {
          time: '08:00 - 09:30',
          subject: 'Matematika',
          class: 'XII IPA 1',
          room: 'Virtual Room 1',
          students: 32,
          type: 'online'
        },
        {
          time: '10:00 - 11:30',
          subject: 'Matematika',
          class: 'XII IPA 2',
          room: 'Ruang 201',
          students: 30,
          type: 'offline'
        }
      ]
    },
    {
      day: 'Selasa',
      date: '2024-03-12',
      classes: [
        {
          time: '13:00 - 14:30',
          subject: 'Matematika',
          class: 'XI IPA 1',
          room: 'Virtual Room 1',
          students: 28,
          type: 'online'
        }
      ]
    }
  ];

  const schedule = user?.role === 'student' ? weeklySchedule : teacherSchedule;

  const getTypeIcon = (type: string) => {
    return type === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    return type === 'online' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Jadwal Pelajaran</h1>
            <p className="text-gray-600">
              {user?.role === 'student' 
                ? 'Lihat jadwal kelas dan aktivitas Anda'
                : 'Kelola jadwal mengajar Anda'
              }
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Jadwal
            </Button>
          )}
        </div>

        <Tabs defaultValue="week" className="space-y-6">
          <TabsList>
            <TabsTrigger value="week">Mingguan</TabsTrigger>
            <TabsTrigger value="month">Bulanan</TabsTrigger>
            <TabsTrigger value="today">Hari Ini</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            <div className="grid gap-4">
              {schedule.map((day, dayIndex) => (
                <Card key={dayIndex}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{day.day}</CardTitle>
                      <span className="text-sm text-gray-600">{day.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {day.classes.length > 0 ? (
                      <div className="space-y-3">
                        {day.classes.map((classItem, classIndex) => (
                          <div key={classIndex} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center text-blue-600 font-medium min-w-[120px]">
                              <Clock className="h-4 w-4 mr-2" />
                              {classItem.time}
                            </div>
                            
                            <div className="flex-1">
                              <div className="font-medium">{classItem.subject}</div>
                              <div className="text-sm text-gray-600">
                                {user?.role === 'student' 
                                  ? classItem.teacher
                                  : `${classItem.class} - ${classItem.students} siswa`
                                }
                              </div>
                            </div>

                            <div className="flex items-center text-sm text-gray-600 min-w-[150px]">
                              {getTypeIcon(classItem.type)}
                              <span className="ml-2">{classItem.room}</span>
                            </div>

                            <Badge className={getTypeColor(classItem.type)}>
                              {classItem.type === 'online' ? 'Online' : 'Offline'}
                            </Badge>

                            <Button size="sm" variant="outline">
                              {classItem.type === 'online' ? 'Gabung' : 'Detail'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Tidak ada jadwal untuk hari ini
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Jadwal Hari Ini - {new Date().toLocaleDateString('id-ID')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule[0]?.classes.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-blue-600 font-bold text-lg min-w-[100px]">
                          {classItem.time.split(' - ')[0]}
                        </div>
                        <div>
                          <div className="font-medium">{classItem.subject}</div>
                          <div className="text-sm text-gray-600">
                            {user?.role === 'student' ? classItem.teacher : classItem.class}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            {getTypeIcon(classItem.type)}
                            <span className="ml-1">{classItem.room}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(classItem.type)}>
                          {classItem.type === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                        <Button>
                          {classItem.type === 'online' ? 'Gabung Kelas' : 'Lihat Detail'}
                        </Button>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada jadwal untuk hari ini
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kalender Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4" />
                  <p>Tampilan kalender bulanan akan tersedia segera</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
