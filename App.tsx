import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserRole, User, AuthContextType } from './types';
import { Login } from './components/Login';
import { StudentDashboard } from './components/StudentDashboard';
import { MentorDashboard } from './components/MentorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Layout } from './components/Layout';
import { Users, GraduationCap, BookOpen, ShieldCheck } from 'lucide-react';

// --- Auth Context ---
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: UserRole[] }> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to their appropriate dashboard if they try to access a wrong route
    if (user.role === UserRole.STUDENT) return <Navigate to="/student" replace />;
    if (user.role === UserRole.MENTOR) return <Navigate to="/mentor" replace />;
    if (user.role === UserRole.ADMIN) return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to={user ? `/${user.role.toLowerCase()}` : "/login"} replace />} />

          <Route path="/student/*" element={
            <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
              <Layout title="Student Portal" icon={<GraduationCap className="w-6 h-6" />}>
                <StudentDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/mentor/*" element={
            <ProtectedRoute allowedRoles={[UserRole.MENTOR]}>
              <Layout title="Mentor Hub" icon={<BookOpen className="w-6 h-6" />}>
                <MentorDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <Layout title="Admin Console" icon={<ShieldCheck className="w-6 h-6" />}>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
}