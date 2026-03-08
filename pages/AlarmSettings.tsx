
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface AlarmSettingsProps {
  onBack: () => void;
}

const AlarmSettings: React.FC<AlarmSettingsProps> = ({ onBack }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [customEnabled, setCustomEnabled] = useState(true);

  const Toggle = ({ checked, onChange, title, desc }: { checked: boolean, onChange: (v: boolean) => void, title: string, desc: string }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-col gap-1 pr-4">
        <span className="text-sm font-bold text-gray-900">{title}</span>
        <span className="text-[11px] text-gray-400 leading-tight">{desc}</span>
      </div>
      <button 
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0 shadow-sm'}`} />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col animate-fadeIn h-full bg-white">
      <div className="px-6 pt-6 flex items-center gap-4 border-b border-gray-50 pb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-bold">알림 설정</span>
      </div>

      <div className="flex flex-col px-6 mt-8 divide-y divide-gray-100">
        <div className="pb-8">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">알림</h3>
          <Toggle 
            title="앱 푸시 알림 받기" 
            desc="사진 분석 결과, 행사 종료 알림"
            checked={pushEnabled} 
            onChange={setPushEnabled} 
          />
          <Toggle 
            title="이메일로 알림 받기" 
            desc="사진 분석 결과, 행사 종료 알림"
            checked={emailEnabled} 
            onChange={setEmailEnabled} 
          />
        </div>

        <div className="pt-8">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">동의 관리</h3>
          <Toggle 
            title="맞춤형 행사 추천 받기" 
            desc="행사 참여 내역을 반영한 비슷한 행사 추천 안내"
            checked={customEnabled} 
            onChange={setCustomEnabled} 
          />
        </div>
      </div>
      
      <div className="mt-auto px-6 py-10 bg-gray-50 border-t border-gray-100">
        <p className="text-[11px] text-gray-400 leading-relaxed">
          * 필수 알림(사진 분석 결과, 행사 관련 안내)은 해당 설정과 무관하게 발송될 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default AlarmSettings;
