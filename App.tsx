
import React, { useState, useEffect } from 'react';
import { ViewType, Event, User } from './types';
import { MOCK_USER, MOCK_EVENTS } from './constants';
import Main from './pages/Main';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import EventStatus from './pages/EventStatus';
import EventResult from './pages/EventResult';
import MyPage from './pages/MyPage';
import ProfileEdit from './pages/ProfileEdit';
import AlarmSettings from './pages/AlarmSettings';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('MAIN');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [viewHistory, setViewHistory] = useState<ViewType[]>([]);

  const navigateTo = (view: ViewType, event?: Event) => {
    setViewHistory(prev => [...prev, currentView]);
    if (event) setSelectedEvent(event);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (viewHistory.length > 0) {
      const prevView = viewHistory[viewHistory.length - 1];
      setViewHistory(prev => prev.slice(0, -1));
      setCurrentView(prevView);
    } else {
      setCurrentView('MAIN');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'MAIN':
        return (
          <Main 
            onEventClick={(e) => navigateTo('EVENT_DETAIL', e)} 
            onParticipatedEventClick={(e) => navigateTo('EVENT_RESULT', e)}
          />
        );
      case 'EVENT_LIST':
        return <EventList onEventClick={(e) => navigateTo('EVENT_DETAIL', e)} />;
      case 'EVENT_DETAIL':
        return <EventDetail event={selectedEvent} onBack={goBack} onSubmit={() => navigateTo('EVENT_STATUS')} />;
      case 'EVENT_STATUS':
        return <EventStatus onBack={() => navigateTo('EVENT_LIST')} onComplete={() => navigateTo('EVENT_RESULT')} />;
      case 'EVENT_RESULT':
        return <EventResult user={user} onBack={goBack} />;
      case 'MYPAGE':
        return (
          <MyPage 
            user={user} 
            onEditProfile={() => navigateTo('PROFILE_EDIT')} 
            onAlarmSettings={() => navigateTo('ALARM_SETTINGS')}
            onEventClick={(e) => navigateTo('EVENT_RESULT', e)}
          />
        );
      case 'PROFILE_EDIT':
        return <ProfileEdit user={user} onBack={goBack} onSave={(updatedUser) => { setUser(updatedUser); goBack(); }} />;
      case 'ALARM_SETTINGS':
        return <AlarmSettings onBack={goBack} />;
      default:
        return (
          <Main 
            onEventClick={(e) => navigateTo('EVENT_DETAIL', e)} 
            onParticipatedEventClick={(e) => navigateTo('EVENT_RESULT', e)}
          />
        );
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="relative w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col pb-20">
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
        
        {/* Only show bottom nav on primary tabs */}
        {['MAIN', 'EVENT_LIST', 'MYPAGE'].includes(currentView) && (
          <BottomNav 
            activeView={currentView} 
            onNavigate={(view) => setCurrentView(view)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
