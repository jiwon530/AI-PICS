
import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface EventStatusProps {
  onBack: () => void;
  onComplete: () => void;
}

const EventStatus: React.FC<EventStatusProps> = ({ onBack, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full animate-fadeIn p-6">
      <header className="flex">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-2">사진 확인 중입니다</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          AI가 행사 사진을 확인하고 있어요<br />
          사진이 준비되면 알려드릴게요
        </p>

        <div className="relative w-48 h-48 mt-12">
          {/* Progress Circular Spinner */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-gray-100" 
              strokeWidth="6" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className="text-blue-500 transition-all duration-300 ease-out" 
              strokeWidth="6" 
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-black text-blue-600">{progress}%</div>
          </div>
        </div>

        <div className="mt-16 text-gray-400 space-y-2">
          <p className="text-[13px]">앱을 닫아도 괜찮아요</p>
          <p className="text-[11px]">완료되면 앱 알림과 이메일로 안내해드릴게요</p>
        </div>
      </div>
    </div>
  );
};

export default EventStatus;
