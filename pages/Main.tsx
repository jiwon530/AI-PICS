
import React from 'react';
import { MOCK_EVENTS } from '../constants';
import { Event } from '../types';
import { ChevronRight, MapPin } from 'lucide-react';

interface MainProps {
  onEventClick: (event: Event) => void;
  onParticipatedEventClick: (event: Event) => void;
}

const Main: React.FC<MainProps> = ({ onEventClick, onParticipatedEventClick }) => {
  const popularEvents = MOCK_EVENTS.slice(0, 2);
  const nowAvailable = MOCK_EVENTS.slice(0, 3);
  const participated = MOCK_EVENTS.slice(3, 4);

  return (
    <div className="flex flex-col animate-fadeIn">
      {/* Header */}
      <header className="px-6 py-6 flex flex-col">
        <h1 className="text-2xl font-black tracking-tighter text-black flex items-center gap-1">
          AI PICS.
        </h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">AI Photo Identification and Categorization System</p>
      </header>

      {/* Popular Events Carousel */}
      <section className="mt-4 px-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">인기있는 이벤트</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {popularEvents.map(event => (
            <div 
              key={event.id}
              onClick={() => onEventClick(event)}
              className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
            >
              <img src={event.thumbnail} alt={event.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{event.type}</span>
                <h3 className="text-md font-bold text-gray-900 mt-1 line-clamp-1">{event.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                  <MapPin size={12} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Now Available Events */}
      <section className="mt-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">지금 참여할 수 있는 이벤트</h2>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
        <div className="space-y-4">
          {nowAvailable.map(event => (
            <div 
              key={event.id}
              onClick={() => onEventClick(event)}
              className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <img src={event.thumbnail} alt={event.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{event.name}</h3>
                <p className="text-[11px] text-gray-500 mt-1">{event.date}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                  <MapPin size={10} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Participated Events */}
      <section className="mt-8 px-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">내가 참여했던 이벤트</h2>
        <div className="space-y-4">
          {participated.map(event => (
            <div 
              key={event.id}
              onClick={() => onParticipatedEventClick(event)}
              className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
            >
              <img src={event.thumbnail} alt={event.name} className="w-20 h-20 rounded-lg object-cover grayscale flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-700">{event.name}</h3>
                <p className="text-[11px] text-gray-500">{event.date}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <MapPin size={10} />
                  <span>{event.location}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
