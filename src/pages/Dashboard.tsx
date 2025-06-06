
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import StudentDashboard from '@/components/Dashboard/StudentDashboard';
import TeacherDashboard from '@/components/Dashboard/TeacherDashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Dashboard tidak tersedia</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
