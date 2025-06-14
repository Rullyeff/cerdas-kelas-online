
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, BookOpen, FileText, BarChart3, Calendar, MessageSquare,
  Users, Settings, ClipboardCheck, Library, GraduationCap, 
  FolderOpen, Award, Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: 'Home', path: '/dashboard' },
      { icon: BookOpen, label: 'Courses', path: '/classes' },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...commonItems,
          { icon: FileText, label: 'Assignments', path: '/assignments' },
          { icon: ClipboardCheck, label: 'Tests & Quizzes', path: '/exams' },
          { icon: BarChart3, label: 'Grades', path: '/grades' },
          { icon: Calendar, label: 'Calendar', path: '/schedule' },
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
          { icon: Library, label: 'Resources', path: '/library' },
          { icon: Settings, label: 'Account', path: '/settings' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { icon: FileText, label: 'Assignments', path: '/assignments' },
          { icon: ClipboardCheck, label: 'Tests & Quizzes', path: '/exams' },
          { icon: BarChart3, label: 'Gradebook', path: '/grading' },
          { icon: Users, label: 'People', path: '/students' },
          { icon: Calendar, label: 'Calendar', path: '/schedule' },
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
          { icon: Library, label: 'Resources', path: '/library' },
          { icon: Award, label: 'Attendance', path: '/attendance' },
          { icon: Settings, label: 'Account', path: '/settings' },
        ];
      case 'admin':
        return [
          ...commonItems,
          { icon: FileText, label: 'Assignments', path: '/assignments' },
          { icon: ClipboardCheck, label: 'Tests & Quizzes', path: '/exams' },
          { icon: BarChart3, label: 'Reports', path: '/reports' },
          { icon: Users, label: 'Students', path: '/students' },
          { icon: GraduationCap, label: 'Teachers', path: '/teachers' },
          { icon: FolderOpen, label: 'User Management', path: '/users' },
          { icon: Calendar, label: 'Calendar', path: '/schedule' },
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
          { icon: Library, label: 'Resources', path: '/library' },
          { icon: Settings, label: 'System Settings', path: '/settings' },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen py-4 hidden md:block">
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Edukasi Anak Bangsa</h2>
        <p className="text-sm text-gray-600 mt-1">Learning Management System</p>
      </div>
      
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
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

      <div className="mt-8 px-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Quick Access</span>
          </div>
          <div className="space-y-1">
            <a href="/assignments" className="block text-xs text-gray-600 hover:text-blue-600">Recent Assignments</a>
            <a href="/grades" className="block text-xs text-gray-600 hover:text-blue-600">Grade Center</a>
            <a href="/calendar" className="block text-xs text-gray-600 hover:text-blue-600">Upcoming Events</a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
