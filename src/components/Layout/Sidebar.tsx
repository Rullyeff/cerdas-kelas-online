
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, MessageSquare, Library, BookOpen, Users, FileText, 
  ClipboardCheck, BarChart3, Calendar, GraduationCap, UserCheck, Settings
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
          { icon: Users, label: 'Siswa', path: '/students' },
          { icon: FileText, label: 'Tugas', path: '/assignments' },
          { icon: ClipboardCheck, label: 'Ujian', path: '/exams' },
          { icon: BarChart3, label: 'Penilaian', path: '/grades' },
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
          { icon: BookOpen, label: 'Kelas Saya', path: '/classes' },
          { icon: Users, label: 'Siswa', path: '/students' },
          { icon: UserCheck, label: 'Guru', path: '/teachers' },
          { icon: FileText, label: 'Tugas', path: '/assignments' },
          { icon: ClipboardCheck, label: 'Ujian', path: '/exams' },
          { icon: BarChart3, label: 'Penilaian', path: '/reports' },
          { icon: Calendar, label: 'Jadwal', path: '/schedule' },
          { icon: Settings, label: 'Pengaturan', path: '/settings' },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen py-6 hidden md:block">
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
