
import React from 'react';
import { User, Event } from '../types';
import { Settings, Bell, ChevronRight, MapPin } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';

interface MyPageProps {
  user: User;
  onEditProfile: () => void;
  onAlarmSettings: () => void;
  onEventClick: (event: Event) => void;
}

const MyPage: React.FC<MyPageProps> = ({ user, onEditProfile, onAlarmSettings, onEventClick }) => {
  const participatedEvents = MOCK_EVENTS.slice(3, 4);

  return (
    <div className="flex flex-col animate-fadeIn">
      {/* Header */}
      <header className="px-6 py-6 flex flex-col">
        <h1 className="text-2xl font-black tracking-tighter text-black flex items-center gap-1">
          AI PICS.
        </h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">AI Photo Identification and Categorization System</p>
      </header>

      {/* Profile Section */}
      <div className="px-6 flex flex-col items-center text-center mt-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
          <img src={user.profileImg} alt="" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <div className="flex gap-4 text-xs text-gray-400 mt-1">
          <span>{user.email}</span>
          <span>|</span>
          <span>{user.phone}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 mt-8 flex gap-3">
        <button 
          onClick={onEditProfile}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-bold transition-colors"
        >
          <Settings size={16} />
          프로필 수정
        </button>
        <button 
          onClick={onAlarmSettings}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl text-sm font-bold transition-colors"
        >
          <Bell size={16} />
          알림 설정
        </button>
      </div>

      {/* Participated Events */}
      <div className="mt-12 px-6">
        <h3 className="text-lg font-bold mb-4">내가 참여했던 이벤트</h3>
        {participatedEvents.length > 0 ? (
          <div className="space-y-4">
            {participatedEvents.map(event => (
              <div 
                key={event.id}
                onClick={() => onEventClick(event)}
                className="group relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <img src={event.thumbnail} alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900">{event.name}</h4>
                    <p className="text-[11px] text-gray-500 mt-1">{event.date}</p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                      <MapPin size={10} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-10 text-center">
            <p className="text-sm text-gray-400">아직 참여한 이벤트가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
