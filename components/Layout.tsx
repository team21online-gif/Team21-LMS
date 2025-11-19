import React from 'react';
import { useAuth } from '../App';
import { LogOut, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, icon }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sticky Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
                {icon}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Team21 LMS</h1>
                <p className="text-xs text-slate-500 font-medium">{title}</p>
              </div>
            </div>

            {/* Desktop Profile & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                <img 
                  src={user?.avatarUrl || "https://picsum.photos/32/32"} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border border-slate-300" 
                />
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                    <span className="text-[10px] uppercase font-bold text-brand-600 leading-none">{user?.role}</span>
                </div>
              </div>
              <button 
                onClick={logout} 
                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg absolute w-full">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <div className="flex items-center gap-3 p-3 border-b border-slate-100 mb-2">
                 <img 
                  src={user?.avatarUrl || "https://picsum.photos/32/32"} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full" 
                />
                <div>
                    <p className="font-medium text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.role}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          &copy; 2025 Team21. Building the future of tech.
        </div>
      </footer>
    </div>
  );
};