import React, { useState } from 'react';
import { useAuth } from '../App';
import { DEMO_USERS } from '../constants';
import { UserRole, User } from '../types';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Book, Key, Users } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);

  const handleLogin = (role: UserRole) => {
    // Simulate finding a user with that role
    const user = DEMO_USERS.find(u => u.role === role);
    if (user) {
      login(user);
      if (role === UserRole.STUDENT) navigate('/student');
      else if (role === UserRole.MENTOR) navigate('/mentor');
      else if (role === UserRole.ADMIN) navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-4">
            <UserCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome to Team21</h1>
          <p className="text-slate-500 mt-2">Select your portal to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin(UserRole.STUDENT)}
            className="w-full flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all group"
          >
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200">
              <Book className="w-6 h-6" />
            </div>
            <div className="ml-4 text-left">
              <p className="font-bold text-slate-800">Student Portal</p>
              <p className="text-xs text-slate-500">Access lessons & submit work</p>
            </div>
          </button>

          <button
            onClick={() => handleLogin(UserRole.MENTOR)}
            className="w-full flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all group"
          >
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-200">
              <Users className="w-6 h-6" />
            </div>
            <div className="ml-4 text-left">
              <p className="font-bold text-slate-800">Mentor Access</p>
              <p className="text-xs text-slate-500">Review & guide students</p>
            </div>
          </button>

          <button
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all group"
          >
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-200">
              <Key className="w-6 h-6" />
            </div>
            <div className="ml-4 text-left">
              <p className="font-bold text-slate-800">Admin Console</p>
              <p className="text-xs text-slate-500">Manage users & settings</p>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
           Secure System &copy; 2025 Team21
        </div>
      </div>
    </div>
  );
};