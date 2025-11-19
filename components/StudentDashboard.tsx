import React, { useState, useMemo } from 'react';
import { MOCK_LESSONS, MOCK_COURSEWORK } from '../constants';
import { Lesson } from '../types';
import { BookOpen, CheckCircle, Clock, MessageSquare, PlayCircle, Send, Filter, ChevronDown, ChevronRight, Check, Circle } from 'lucide-react';
import { generateLessonSummary, askTutor } from '../services/geminiService';

export const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'work'>('lessons');
  const [selectedCourse, setSelectedCourse] = useState<string>('AI Unlocked');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({ 1: true });
  const [completedLessons, setCompletedLessons] = useState<string[]>(['ai-w1-1']); // Mock initial state
  
  // AI State
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatAnswer, setChatAnswer] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const courses = Array.from(new Set(MOCK_LESSONS.map(l => l.course)));

  // Filter lessons by course
  const courseLessons = useMemo(() => 
    MOCK_LESSONS.filter(l => l.course === selectedCourse).sort((a, b) => a.week - b.week),
  [selectedCourse]);

  // Group lessons by week
  const lessonsByWeek = useMemo(() => {
    const grouped: Record<string, Lesson[]> = {};
    courseLessons.forEach(lesson => {
      const w = lesson.week.toString();
      if (!grouped[w]) grouped[w] = [];
      grouped[w].push(lesson);
    });
    return grouped;
  }, [courseLessons]);

  // Progress Calculation
  const totalLessons = courseLessons.length;
  const completedCount = courseLessons.filter(l => completedLessons.includes(l.id)).length;
  const progressPercentage = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const selectedLesson = MOCK_LESSONS.find(l => l.id === selectedLessonId);

  const handleLessonSelect = (id: string) => {
    setSelectedLessonId(id);
    setAiSummary(null);
    setChatAnswer('');
    setChatQuestion('');
  };

  const toggleWeek = (week: number) => {
    setExpandedWeeks(prev => ({...prev, [week]: !prev[week]}));
  };

  const toggleLessonCompletion = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]
    );
  };

  const handleGenerateSummary = async () => {
    if (!selectedLesson) return;
    setIsLoadingAI(true);
    const summary = await generateLessonSummary(selectedLesson.content);
    setAiSummary(summary);
    setIsLoadingAI(false);
  };

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim() || !selectedLesson) return;
    setIsChatting(true);
    const answer = await askTutor(chatQuestion, selectedLesson.content);
    setChatAnswer(answer);
    setIsChatting(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Navigation & Course Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'lessons' ? 'bg-brand-500 text-white shadow' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Classroom
          </button>
          <button
            onClick={() => setActiveTab('work')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'work' ? 'bg-brand-500 text-white shadow' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
             Assignments
          </button>
        </div>

        {activeTab === 'lessons' && (
          <div className="flex items-center gap-2">
             <Filter className="w-4 h-4 text-slate-400" />
             <select 
                value={selectedCourse}
                onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedLessonId(null);
                }}
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2"
             >
               {courses.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
          </div>
        )}
      </div>

      {/* Progress Bar (Only in Lessons View) */}
      {activeTab === 'lessons' && (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-slate-700">Course Progress</h3>
                <span className="text-xs font-bold text-brand-600">{progressPercentage}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                    className="bg-brand-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
      )}

      {/* Content Area */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Modules List */}
          <div className="lg:col-span-1 space-y-4 h-fit">
            {Object.entries(lessonsByWeek).map(([week, lessons]) => {
              const weekNum = parseInt(week);
              const isExpanded = expandedWeeks[weekNum];
              const weekTitle = lessons[0]?.module.split(':')[0] || `Week ${week}`;

              return (
                <div key={week} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <button 
                        onClick={() => toggleWeek(weekNum)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                        <span className="font-bold text-slate-700 text-sm">{weekTitle}</span>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </button>
                    
                    {isExpanded && (
                        <div className="divide-y divide-slate-100">
                            {lessons.map((lesson) => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                const isSelected = selectedLessonId === lesson.id;
                                return (
                                    <div
                                        key={lesson.id}
                                        onClick={() => handleLessonSelect(lesson.id)}
                                        className={`p-4 cursor-pointer transition-all flex items-start gap-3 ${
                                            isSelected ? 'bg-brand-50/50 border-l-4 border-l-brand-500' : 'bg-white border-l-4 border-l-transparent hover:bg-slate-50'
                                        }`}
                                    >
                                        <button 
                                            onClick={(e) => toggleLessonCompletion(e, lesson.id)}
                                            className={`mt-0.5 shrink-0 ${isCompleted ? 'text-brand-500' : 'text-slate-300 hover:text-slate-400'}`}
                                        >
                                            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                        </button>
                                        
                                        <div>
                                            <h4 className={`text-sm font-semibold leading-tight mb-1 ${isSelected ? 'text-brand-900' : 'text-slate-700'}`}>
                                                {lesson.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                <span>{lesson.duration}</span>
                                                <span>•</span>
                                                <span className="uppercase">{lesson.difficulty}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
              );
            })}
          </div>

          {/* Lesson Details */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[600px] flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-100 pb-4 mb-4 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{selectedLesson.course}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-500">Week {selectedLesson.week}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedLesson.title}</h2>
                    </div>
                    <div className="flex gap-2 shrink-0">
                         <button 
                            onClick={(e) => toggleLessonCompletion(e, selectedLesson.id)}
                            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                                completedLessons.includes(selectedLesson.id)
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {completedLessons.includes(selectedLesson.id) ? (
                                <><Check className="w-3 h-3" /> Completed</>
                            ) : (
                                'Mark Complete'
                            )}
                        </button>
                        <button 
                            onClick={handleGenerateSummary}
                            disabled={isLoadingAI}
                            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 border border-purple-100"
                        >
                            {isLoadingAI ? 'Thinking...' : '✨ AI Summary'}
                        </button>
                    </div>
                </div>

                {aiSummary && (
                    <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl mb-6 text-sm text-purple-900 animate-fade-in">
                        <h4 className="font-bold mb-1 flex items-center gap-2 text-purple-700">
                            <MessageSquare className="w-4 h-4" /> Key Takeaways
                        </h4>
                        <div className="whitespace-pre-line leading-relaxed">{aiSummary}</div>
                    </div>
                )}
                
                <div className="prose prose-slate prose-sm sm:prose-base max-w-none flex-grow">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">{selectedLesson.content}</div>
                </div>

                {/* AI Tutor Section */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-brand-100 rounded-full">
                            <MessageSquare className="w-4 h-4 text-brand-600" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">AI Tutor</h4>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {chatAnswer && (
                             <div className="mb-4 p-3 bg-white rounded-lg border border-slate-100 text-sm text-slate-700 shadow-sm">
                                <span className="font-bold text-brand-600 block mb-1 text-xs uppercase">Tutor Answer</span> 
                                {chatAnswer}
                             </div>
                        )}
                        <form onSubmit={handleAskTutor} className="flex gap-2">
                            <input 
                                type="text" 
                                value={chatQuestion}
                                onChange={(e) => setChatQuestion(e.target.value)}
                                placeholder="Ask a question about this lesson..."
                                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <button 
                                type="submit"
                                disabled={isChatting}
                                className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-12 bg-slate-50/50">
                <BookOpen className="w-12 h-12 mb-4 opacity-30" />
                <p className="font-medium">Select a lesson from the list to begin learning</p>
                <p className="text-xs mt-2 text-slate-400">Content is grouped by week</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'work' && (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">My Assignments</h2>
            <div className="grid gap-4">
                {MOCK_COURSEWORK.map((work) => (
                    <div key={work.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h3 className="font-semibold text-slate-900">{work.title}</h3>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">{work.course}</span>
                                {work.status === 'SUBMITTED' && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full">IN REVIEW</span>}
                                {work.status === 'GRADED' && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">GRADED: {work.grade}/100</span>}
                                {work.status === 'PENDING' && <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">PENDING</span>}
                            </div>
                            <p className="text-sm text-slate-500">{work.description}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Due: {work.dueDate}</span>
                            </div>
                        </div>
                        
                        <div className="w-full sm:w-auto">
                            {work.status === 'PENDING' ? (
                                <button className="w-full sm:w-auto px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors shadow-sm shadow-brand-200">
                                    Submit Work
                                </button>
                            ) : (
                                <button className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                                    View Submission
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};