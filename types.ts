
export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  thumbnail: string;
  type: string;
  category?: string;
}

export type ViewType = 'MAIN' | 'EVENT_LIST' | 'EVENT_DETAIL' | 'EVENT_STATUS' | 'EVENT_RESULT' | 'MYPAGE' | 'PROFILE_EDIT' | 'ALARM_SETTINGS';

export interface User {
  name: string;
  email: string;
  phone: string;
  profileImg: string;
}
