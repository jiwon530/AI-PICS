
import React, { useState } from 'react';
import { Search, ChevronDown, MapPin, Filter } from 'lucide-react';
import { MOCK_EVENTS, EVENT_CATEGORIES, EVENT_TYPES } from '../constants';
import { Event } from '../types';

interface EventListProps {
  onEventClick: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ onEventClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || event.category === selectedCategory;
    const matchesType = selectedType === '전체' || event.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="flex flex-col px-6 py-6 animate-fadeIn">
      {/* Header */}
      <header className="flex flex-col mb-6">
        <h1 className="text-2xl font-black tracking-tighter text-black flex items-center gap-1">
          AI PICS.
        </h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">AI Photo Identification and Categorization System</p>
      </header>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="이벤트명을 입력하세요"
          className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dual Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-gray-400 mb-1">
          <Filter size={14} />
          <span className="text-[11px] font-bold uppercase tracking-wider">상세 필터</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* 행사 분류 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 pl-1">행사 분류</label>
            <div className="relative">
              <select 
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-3 px-4 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {EVENT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* 행사 종류 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 pl-1">행사 종류</label>
            <div className="relative">
              <select 
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-3 px-4 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {EVENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-end mb-4 px-1">
        <h2 className="text-sm font-bold text-gray-800">이벤트 목록 <span className="text-blue-500 ml-1">{filteredEvents.length}</span></h2>
        {(selectedCategory !== '전체' || selectedType !== '전체' || searchTerm !== '') && (
          <button 
            onClick={() => { setSelectedCategory('전체'); setSelectedType('전체'); setSearchTerm(''); }}
            className="text-[11px] text-gray-400 hover:text-blue-500 transition-colors"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-4 mb-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div 
              key={event.id}
              onClick={() => onEventClick(event)}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
            >
              <div className="relative">
                <img src={event.thumbnail} alt={event.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-4 ring-gray-50 group-hover:ring-blue-50 transition-all" />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-[9px] text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                  {event.type}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-blue-500 uppercase mb-1">{event.category}</div>
                <h3 className="text-[15px] font-bold text-gray-900 line-clamp-1 leading-tight">{event.name}</h3>
                <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1 font-medium italic">
                  {event.date}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                  <MapPin size={10} className="text-gray-300" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Search size={40} className="opacity-20" />
            </div>
            <p className="text-sm font-medium">일치하는 이벤트를 찾지 못했습니다</p>
            <p className="text-[11px] mt-1">다른 키워드나 필터를 선택해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
