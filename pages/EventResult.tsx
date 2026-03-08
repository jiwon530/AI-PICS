import React, { useState } from 'react';
import { ChevronLeft, X, Download, Share2 } from 'lucide-react';
import { User } from '../types';

interface EventResultProps {
  user: User;
  onBack: () => void;
}

const EventResult: React.FC<EventResultProps> = ({ user, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // AI가 찾은 '동일 인물'의 다양한 사진들 (고화질 포트레이트 세트)
  const images = [
    { id: 0, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMjFfMjgx%2FMDAxNzAzMTAwMDEwODI1.sZARBt3fwkZGrFJhPzq9J4JI9m8gDySzUlshQAoLhzsg.HJ6Af-FXQO2KRUcjtVMj4epKHCWl7CU6Y64NiRY4268g.PNG.jonggeon1217%2F21.PNG&type=a340' },
    { id: 1, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F433%2F2024%2F06%2F18%2F0000105494_002_20240618121913961.jpg&type=a340' },
    { id: 2, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F009%2F2024%2F02%2F19%2F0005260299_001_20240219084903257.jpg&type=a340' },
    { id: 3, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F079%2F2024%2F05%2F16%2F0003895681_001_20240516160501205.jpg&type=sc960_832' },
    { id: 4, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F311%2F2026%2F02%2F03%2F0001970645_004_20260203071508478.jpg&type=sc960_832' },
    { id: 5, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F629%2F2024%2F09%2F08%2F202460941725798894_20240908220020510.jpg&type=sc960_832' },
    { id: 6, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA1MjhfMTgz%2FMDAxNzQ4NDEyODMwMjgw.50fgGfqqDHwNl636wmtxFzl3sMbeB8P-c1bhSPNyDPQg.QCqB3h-EIiKApMUbyadOx2_DtDGboZM7F-znrRmw178g.PNG%2F%25BD%25BA%25C5%25A9%25B8%25B0%25BC%25A6_2025-05-28_151021.png&type=sc960_832' },
    { id: 7, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA1MjhfMjgy%2FMDAxNzQ4NDQ0MzE5ODA5.yHPkGo_cWgDTu4K6gEXbuk3tjrklN_v2wNY6O_oV_sEg.FvrYxwYOwNLbLZdmchX1ezfdaJ2QiU8wLdk2cuDGOX4g.JPEG%2F%25BD%25BA%25C5%25A9%25B8%25B0%25BC%25A6_28-5-2025_23581_www.msn.com.jpeg&type=sc960_832' },
    { id: 8, url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F382%2F2024%2F12%2F25%2F0001170418_001_20241225213311796.jpg&type=sc960_832' },
  ];

  const closeViewer = () => setSelectedImage(null);

  return (
    <div className="flex flex-col animate-fadeIn relative h-full">
      <div className="px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-bold">사진 결과 보기</span>
      </div>

      {/* User Info & AI Status */}
      <div className="px-6 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.profileImg} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 shadow-md" />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white shadow-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">{user.name} 님</h3>
            <p className="text-xs text-gray-400">등록하신 셀카와 <span className="text-blue-600 font-bold">99%</span> 일치합니다</p>
            <p className="text-xs text-blue-600 font-bold mt-1">발견된 사진 총 {images.length}장</p>
          </div>
        </div>
        <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 transition-colors">
          <Share2 size={20} />
        </button>
      </div>

      <div className="px-6 mb-4">
        <div className="h-[1px] bg-gray-100 w-full" />
      </div>

      {/* Photo Grid */}
      <div className="px-2 grid grid-cols-3 gap-1 mb-8 overflow-y-auto">
        {images.map((img, i) => (
          <div 
            key={img.id}
            onClick={() => setSelectedImage(i)}
            className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative group"
          >
            <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Image Viewer Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-fadeIn">
          <div className="p-6 flex justify-between items-center text-white">
            <span className="text-sm font-medium tracking-widest">{selectedImage + 1} / {images.length}</span>
            <button onClick={closeViewer} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden touch-none px-4">
            <img 
              src={images[selectedImage].url} 
              alt="" 
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="p-8 flex justify-center items-center gap-12">
            <button className="flex flex-col items-center gap-3 text-white/50 hover:text-white transition-all group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
                <Download size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Download</span>
            </button>
            <button className="flex flex-col items-center gap-3 text-white/50 hover:text-white transition-all group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
                <Share2 size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Share</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventResult;