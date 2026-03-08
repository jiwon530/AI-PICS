
import { Event, User } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: '2025 FUTURE FORUM',
    date: '4월 25일 (수) - 4월 26일 (금)',
    location: '코엑스',
    thumbnail: 'https://picsum.photos/seed/future/600/400',
    type: '세미나',
    category: 'IT/프로그래밍'
  },
  {
    id: '2',
    name: 'AI Technology Conference',
    date: '4월 25일 (수) - 4월 26일 (금)',
    location: '코엑스',
    thumbnail: 'https://picsum.photos/seed/ai/600/400',
    type: '컨퍼런스',
    category: 'IT/프로그래밍'
  },
  {
    id: '3',
    name: '2026 RUN SEOUL RUN',
    date: '3월 21일 (화)',
    location: '여의도공원',
    thumbnail: 'https://picsum.photos/seed/run/600/400',
    type: '스포츠',
    category: '기타'
  },
  {
    id: '4',
    name: 'Creative Tech Conference',
    date: '2월 12일 (토) - 2월 13일 (일)',
    location: '코엑스',
    thumbnail: 'https://picsum.photos/seed/creative/600/400',
    type: '컨퍼런스',
    category: 'IT/프로그래밍'
  }
];

export const MOCK_USER: User = {
  name: 'KARINA',
  email: 'karina@aespa.com',
  phone: '010-1234-5678',
  profileImg: 'https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F004c97f1-39ab-4074-9020-3efc0d74332d.jpg'
};

// 행사 분류 (행사 성격)
export const EVENT_CATEGORIES = [
  '전체', '강연/세미나', '공연/전시', '관광/투어', '기업회의', '대회/공모전', '데모데이', '런칭이벤트', '박람회/페어', 'IT/프로그래밍', '기타'
];

// 행사 종류 (포맷)
export const EVENT_TYPES = [
  '전체', '세미나', '컨퍼런스', '스포츠', '축제', '네트워킹', '기타'
];
