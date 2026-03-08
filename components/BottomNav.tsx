
import React from 'react';
import { Home, Calendar, User } from 'lucide-react';
import { ViewType } from '../types';

interface BottomNavProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex items-center justify-around h-20 px-4 z-50">
      <button 
        onClick={() => onNavigate('MAIN')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'MAIN' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
      >
        <Home size={24} />
        <span className="text-[10px]">MAIN</span>
      </button>
      <button 
        onClick={() => onNavigate('EVENT_LIST')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'EVENT_LIST' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
      >
        <Calendar size={24} />
        <span className="text-[10px]">EVENT</span>
      </button>
      <button 
        onClick={() => onNavigate('MYPAGE')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'MYPAGE' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
      >
        <User size={24} />
        <span className="text-[10px]">MY PAGE</span>
      </button>
    </nav>
  );
};

export default BottomNav;
