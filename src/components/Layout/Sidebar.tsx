
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Users,
  Calendar,
  FileText,
  BarChart3,
  MessageSquare,
  Library,
  Settings,
  GraduationCap,
  ClipboardCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: MessageSquare, label: 'Pesan', path: '/messages' },
      { icon: Library, label: 'Perpustakaan', path: '/library' },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...commonItems,
          { icon: BookOpen, label: 'Kelas Saya', path: '/classes' },
          { icon: FileText, label: 'Tugas', path: '/assignments' },
          { icon: ClipboardCheck, label: 'Ujian', path: '/exams' },
          { icon: BarChart3, label: 'Nilai', path: '/grades' },
          { icon: Calendar, label: 'Jadwal', path: '/schedule' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { icon: BookOpen, label: 'Kelas Saya', path: '/classes' },
          { icon: Users, label: 'Siswa', path: '/students' },
          { icon: FileText, label: 'Tugas', path: '/assignments' },
          { icon: ClipboardCheck, label: 'Ujian', path: '/exams' },
          { icon: BarChart3, label: 'Penilaian', path: '/grading' },
          { icon: Calendar, label: 'Jadwal', path: '/schedule' },
        ];
      case 'admin':
        return [
          ...commonItems,
          { icon: Users, label: 'Manajemen User', path: '/users' },
          { icon: GraduationCap, label: 'Kelas', path: '/classes' },
          { icon: UserCheck, label: 'Guru', path: '/teachers' },
          { icon: BarChart3, label: 'Laporan', path: '/reports' },
          { icon: Settings, label: 'Pengaturan', path: '/settings' },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
