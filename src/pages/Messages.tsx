
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, MessageCircle, Clock, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Wijaya',
      role: 'Guru Matematika',
      avatar: '👩‍🏫',
      lastMessage: 'Tugas integral sudah saya periksa, nilainya bagus!',
      timestamp: '2 jam lalu',
      unread: 2,
      subject: 'Matematika'
    },
    {
      id: 2,
      name: 'Ahmad Rizky',
      role: 'Siswa XII IPA 1',
      avatar: '👨‍🎓',
      lastMessage: 'Pak, saya ada pertanyaan tentang materi limit',
      timestamp: '5 jam lalu',
      unread: 0,
      subject: 'Matematika'
    },
    {
      id: 3,
      name: 'Admin Sekolah',
      role: 'Administrator',
      avatar: '👨‍💼',
      lastMessage: 'Pengumuman: Ujian tengah semester akan dimulai...',
      timestamp: '1 hari lalu',
      unread: 1,
      subject: 'Pengumuman'
    },
    {
      id: 4,
      name: 'Prof. Ahmad Rahman',
      role: 'Guru Fisika',
      avatar: '👨‍🏫',
      lastMessage: 'Laporan praktikum sudah bisa didownload',
      timestamp: '2 hari lalu',
      unread: 0,
      subject: 'Fisika'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Wijaya',
      content: 'Selamat siang! Saya sudah memeriksa tugas integral yang Anda kumpulkan.',
      timestamp: '14:30',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Ahmad Rizky',
      content: 'Terima kasih bu, bagaimana hasilnya?',
      timestamp: '14:32',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Dr. Sarah Wijaya',
      content: 'Nilainya bagus, 85/100. Untuk soal nomor 3 masih ada kesalahan kecil dalam penerapan rumus.',
      timestamp: '14:35',
      isOwn: false
    },
    {
      id: 4,
      sender: 'Dr. Sarah Wijaya',
      content: 'Silakan pelajari lagi materi substitusi untuk persiapan ujian besok.',
      timestamp: '14:35',
      isOwn: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesan</h1>
            <p className="text-gray-600">Komunikasi dengan guru, siswa, dan admin</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Pesan Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Pesan Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Penerima</Label>
                  <Input id="recipient" placeholder="Cari nama..." />
                </div>
                <div>
                  <Label htmlFor="subject">Subjek</Label>
                  <Input id="subject" placeholder="Subjek pesan" />
                </div>
                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea id="message" placeholder="Tulis pesan Anda..." rows={4} />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Pesan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Daftar Percakapan */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Percakapan</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Cari percakapan..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{conversation.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge className="bg-red-500 text-white">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{conversation.role}</p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {conversation.subject}
                          </Badge>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Area Chat */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {conversations.find(c => c.id === selectedConversation)?.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {conversations.find(c => c.id === selectedConversation)?.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {conversations.find(c => c.id === selectedConversation)?.role}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-[400px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.isOwn ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Pesan */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Ketik pesan..." className="flex-1" />
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Pilih percakapan untuk mulai berkirim pesan</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
