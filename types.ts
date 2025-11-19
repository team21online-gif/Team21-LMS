export enum UserRole {
  STUDENT = 'STUDENT',
  MENTOR = 'MENTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export interface Coursework {
  id: string;
  course: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  submissionContent?: string;
  grade?: number;
  feedback?: string;
  studentId: string;
}

export interface Lesson {
  id: string;
  course: string;
  week: number; // Added week for grouping
  title: string;
  module: string;
  content: string; // Markdown supported
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface RegistrationStats {
  month: string;
  students: number;
  mentors: number;
}