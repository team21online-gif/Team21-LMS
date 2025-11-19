import React, { useState } from 'react';
import { MOCK_COURSEWORK, DEMO_USERS } from '../constants';
import { UserRole } from '../types';
import { User, FileText, Sparkles, Check } from 'lucide-react';
import { generateGradingFeedback } from '../services/geminiService';

export const MentorDashboard = () => {
  const students = DEMO_USERS.filter(u => u.role === UserRole.STUDENT);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id);
  const [feedbackDrafts, setFeedbackDrafts] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});

  const studentWork = MOCK_COURSEWORK.filter(cw => cw.studentId === selectedStudentId);

  const handleGenerateFeedback = async (workId: string, title: string, content: string) => {
    setIsGenerating(prev => ({ ...prev, [workId]: true }));
    const feedback = await generateGradingFeedback(title, content);
    setFeedbackDrafts(prev => ({ ...prev, [workId]: feedback }));
    setIsGenerating(prev => ({ ...prev, [workId]: false }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Student List */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">Assigned Students</h3>
        </div>
        <div className="divide-y divide-slate-100">
            {students.map(student => (
                <button
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left ${
                        selectedStudentId === student.id ? 'bg-brand-50 border-l-4 border-brand-500' : 'border-l-4 border-transparent'
                    }`}
                >
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">3 Active Tasks</p>
                    </div>
                </button>
            ))}
        </div>
      </div>

      {/* Work Review Area */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Review Submissions</h2>
        </div>

        <div className="space-y-4">
            {studentWork.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500">No coursework found for this student.</p>
                </div>
            )}

            {studentWork.map(work => (
                <div key={work.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase">{work.course}</span>
                                <h3 className="text-lg font-bold text-slate-900">{work.title}</h3>
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                                    work.status === 'GRADED' ? 'bg-green-100 text-green-700' :
                                    work.status === 'SUBMITTED' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-slate-100 text-slate-500'
                                }`}>
                                    {work.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600">{work.description}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-slate-400">Due: {work.dueDate}</p>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50/50">
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Student Submission</h4>
                        <div className="p-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 mb-4">
                            {work.submissionContent || <span className="italic text-slate-400">No submission content yet.</span>}
                        </div>

                        {work.submissionContent && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase">Mentor Feedback</h4>
                                    <button 
                                        onClick={() => handleGenerateFeedback(work.id, work.title, work.submissionContent!)}
                                        disabled={isGenerating[work.id]}
                                        className="flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        {isGenerating[work.id] ? 'Generating...' : 'Auto-Draft with AI'}
                                    </button>
                                </div>
                                <textarea 
                                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                                    rows={3}
                                    placeholder="Write your feedback here..."
                                    defaultValue={work.feedback || feedbackDrafts[work.id] || ''}
                                />
                                <div className="flex justify-end gap-3">
                                    <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3">
                                        <span className="text-xs text-slate-500 mr-2">Grade:</span>
                                        <input 
                                            type="number" 
                                            className="w-12 py-1 text-sm focus:outline-none" 
                                            placeholder="00"
                                            defaultValue={work.grade}
                                        />
                                        <span className="text-xs text-slate-400">/100</span>
                                    </div>
                                    <button className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 flex items-center gap-2">
                                        <Check className="w-4 h-4" /> Submit Grade
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};