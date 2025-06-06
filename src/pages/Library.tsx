
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Search, Filter, Download, Eye, Star, Clock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Library = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const books = [
    {
      id: 1,
      title: 'Matematika SMA Kelas XII',
      author: 'Tim Penyusun Kemendikbud',
      subject: 'Matematika',
      grade: 'XII',
      cover: '/placeholder.svg',
      pages: 280,
      downloads: 1245,
      rating: 4.8,
      type: 'textbook',
      description: 'Buku teks resmi matematika untuk kelas XII yang membahas integral, diferensial, dan statistika.'
    },
    {
      id: 2,
      title: 'Fisika Modern',
      author: 'Prof. Dr. Ahmad Rahman',
      subject: 'Fisika',
      grade: 'XII',
      cover: '/placeholder.svg',
      pages: 320,
      downloads: 890,
      rating: 4.6,
      type: 'reference',
      description: 'Buku referensi fisika modern yang membahas relativitas, mekanika kuantum, dan fisika atom.'
    },
    {
      id: 3,
      title: 'Kumpulan Soal Kimia',
      author: 'Dr. Maya Sari',
      subject: 'Kimia',
      grade: 'XII',
      cover: '/placeholder.svg',
      pages: 150,
      downloads: 670,
      rating: 4.5,
      type: 'exercise',
      description: 'Kumpulan soal-soal kimia organik dan anorganik dengan pembahasan lengkap.'
    },
    {
      id: 4,
      title: 'Sejarah Indonesia Modern',
      author: 'Tim Sejarah UI',
      subject: 'Sejarah',
      grade: 'XII',
      cover: '/placeholder.svg',
      pages: 400,
      downloads: 520,
      rating: 4.7,
      type: 'textbook',
      description: 'Sejarah Indonesia dari masa kolonial hingga era reformasi dengan analisis mendalam.'
    },
    {
      id: 5,
      title: 'Bahasa Indonesia Lanjut',
      author: 'Dr. Siti Nurhaliza',
      subject: 'Bahasa Indonesia',
      grade: 'XII',
      cover: '/placeholder.svg',
      pages: 200,
      downloads: 780,
      rating: 4.4,
      type: 'textbook',
      description: 'Materi bahasa Indonesia tingkat lanjut dengan fokus pada sastra dan tata bahasa.'
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'textbook', label: 'Buku Teks' },
    { value: 'reference', label: 'Buku Referensi' },
    { value: 'exercise', label: 'Latihan Soal' },
    { value: 'journal', label: 'Jurnal' }
  ];

  const subjects = [
    { value: 'all', label: 'Semua Mata Pelajaran' },
    { value: 'matematika', label: 'Matematika' },
    { value: 'fisika', label: 'Fisika' },
    { value: 'kimia', label: 'Kimia' },
    { value: 'biologi', label: 'Biologi' },
    { value: 'sejarah', label: 'Sejarah' },
    { value: 'bahasa_indonesia', label: 'Bahasa Indonesia' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'textbook': return 'bg-blue-100 text-blue-800';
      case 'reference': return 'bg-green-100 text-green-800';
      case 'exercise': return 'bg-purple-100 text-purple-800';
      case 'journal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'textbook': return 'Buku Teks';
      case 'reference': return 'Referensi';
      case 'exercise': return 'Latihan';
      case 'journal': return 'Jurnal';
      default: return 'Lainnya';
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Perpustakaan Digital</h1>
          <p className="text-gray-600">Akses koleksi buku digital, referensi, dan materi pembelajaran</p>
        </div>

        {/* Search dan Filter */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari buku, penulis, atau mata pelajaran..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Mata Pelajaran" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList>
            <TabsTrigger value="grid">Tampilan Grid</TabsTrigger>
            <TabsTrigger value="list">Tampilan List</TabsTrigger>
            <TabsTrigger value="favorites">Favorit Saya</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                        <Book className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-medium line-clamp-2">
                          {book.title}
                        </CardTitle>
                        <p className="text-xs text-gray-600 mt-1">{book.author}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getTypeColor(book.type)} variant="outline">
                            {getTypeLabel(book.type)}
                          </Badge>
                          <Badge variant="outline">{book.subject}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {book.downloads}
                        </span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          {book.rating}
                        </span>
                      </div>
                      <span>{book.pages} halaman</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Baca
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            {filteredBooks.map((book) => (
              <Card key={book.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <Book className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{book.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getTypeColor(book.type)} variant="outline">
                          {getTypeLabel(book.type)}
                        </Badge>
                        <Badge variant="outline">{book.subject}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {book.rating} • {book.downloads} downloads
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Baca
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Buku Favorit</h3>
                <p className="text-gray-600">
                  Tambahkan buku ke favorit dengan mengklik ikon bintang pada buku yang Anda sukai
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Statistik Perpustakaan */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik Perpustakaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Total Buku</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600">Buku Baru Bulan Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">5,432</div>
                <div className="text-sm text-gray-600">Total Download</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">234</div>
                <div className="text-sm text-gray-600">Pembaca Aktif</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Library;
