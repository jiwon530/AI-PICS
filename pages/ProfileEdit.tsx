
import React, { useState, useRef } from 'react';
import { User } from '../types';
import { ChevronLeft, Camera, LogOut, Trash2 } from 'lucide-react';

interface ProfileEditProps {
  user: User;
  onBack: () => void;
  onSave: (user: User) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ user, onBack, onSave }) => {
  const [formData, setFormData] = useState<User>(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImg: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col animate-fadeIn">
      <div className="px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="text-lg font-bold">프로필 수정</span>
        </div>
      </div>

      {/* Avatar Edit */}
      <div className="mt-10 flex flex-col items-center">
        <div className="relative cursor-pointer group" onClick={handleImageClick}>
          <img 
            src={formData.profileImg} 
            alt="" 
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:opacity-90 transition-opacity" 
          />
          <button 
            type="button"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform"
          >
            <Camera size={20} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <h2 className="text-2xl font-black mt-6 tracking-tight">{formData.name}</h2>
      </div>

      {/* Form Fields */}
      <div className="px-6 mt-12 space-y-6">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Name *</label>
          <input 
            type="text" 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">E-Mail *</label>
          <input 
            type="email" 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="이메일 주소를 입력하세요"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number *</label>
          <input 
            type="tel" 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="휴대폰 번호를 입력하세요"
          />
        </div>

        {/* ETC Section */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">ETC</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-colors group">
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                <span className="text-sm font-bold">로그아웃</span>
              </div>
              <ChevronLeft size={16} className="rotate-180 opacity-40" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-colors group">
              <div className="flex items-center gap-3">
                <Trash2 size={18} />
                <span className="text-sm font-bold">가입탈퇴</span>
              </div>
              <ChevronLeft size={16} className="rotate-180 opacity-40" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 mt-12 mb-12">
        <button 
          onClick={() => onSave(formData)}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
