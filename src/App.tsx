
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/classes" element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            } />
            <Route path="/assignments" element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Halaman Tugas</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/exams" element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Halaman Ujian</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/grades" element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Halaman Nilai</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/schedule" element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Halaman Jadwal</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Halaman Pesan</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/library" element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Perpustakaan Digital</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute requiredRole="teacher">
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Manajemen Siswa</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/grading" element={
              <ProtectedRoute requiredRole="teacher">
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Halaman Penilaian</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Manajemen User</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/teachers" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Manajemen Guru</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Laporan Sistem</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
