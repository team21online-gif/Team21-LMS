import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_STATS } from '../constants';
import { UserRole } from '../types';
import { UserPlus, Users, Shield, GraduationCap } from 'lucide-react';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'stats'>('users');
  
  // Form State
  const [newUserRole, setNewUserRole] = useState<UserRole>(UserRole.STUDENT);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mock User Created:\nName: ${newUserName}\nRole: ${newUserRole}\nEmail: ${newUserEmail}`);
    setNewUserName('');
    setNewUserEmail('');
  };

  return (
    <div className="space-y-8">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <GraduationCap className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">Total Students</p>
                <p className="text-2xl font-bold text-slate-900">124</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">Active Mentors</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <Shield className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">System Admins</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 flex">
            <button 
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'users' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
            >
                User Management
            </button>
            <button 
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'stats' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
            >
                Registration Analytics
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'users' && (
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-brand-50 rounded-full text-brand-600 mb-3">
                            <UserPlus className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Create New User</h2>
                        <p className="text-slate-500">Add a new Student, Mentor, or Admin to the platform.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-3 gap-4">
                            {[UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setNewUserRole(role)}
                                    className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all capitalize ${
                                        newUserRole === role 
                                        ? 'border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500' 
                                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                                >
                                    {role.toLowerCase()}
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                placeholder="e.g. Jane Doe"
                            />
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                            Create Account
                        </button>
                    </form>
                </div>
            )}

            {activeTab === 'stats' && (
                <div className="h-[400px] w-full">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">New Registrations (Last 6 Months)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_STATS} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: '#f1f5f9' }}
                            />
                            <Bar dataKey="students" fill="#22c55e" name="Students" radius={[4, 4, 0, 0]} barSize={32} />
                            <Bar dataKey="mentors" fill="#6366f1" name="Mentors" radius={[4, 4, 0, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
          </div>
      </div>
    </div>
  );
};