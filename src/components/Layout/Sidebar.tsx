
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, BookOpen, Users, Calendar, FileText, BarChart3, MessageSquare, Library,
  Settings, GraduationCap, ClipboardCheck, UserCheck
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
    <aside className="bg-white border-r border-border w-64 min-h-screen py-6 hidden md:block">
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground hover:bg-secondary'
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
