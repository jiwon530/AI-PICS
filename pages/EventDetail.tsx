
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, Check, RotateCcw } from 'lucide-react';
import { Event } from '../types';

interface EventDetailProps {
  event: Event | null;
  onBack: () => void;
  onSubmit: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [selfie, setSelfie] = useState<string | null>(null);
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 카메라 시작 (스트림 요청만 수행)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("카메라 권한을 허용해주세요.");
    }
  };

  // video 엘리먼트가 마운트된 후 스트림 연결
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const takePhoto = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부하 방지
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      
      // 실제 비디오 해상도에 맞춤
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // 전면 카메라 좌우 반전 처리
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setSelfie(dataUrl);
        stopCamera();
      }
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const isFormValid = name && email && phone && agreed && selfie;

  if (!event) return null;

  return (
    <div className="flex flex-col animate-fadeIn">
      <div className="px-6 pt-6 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-bold">이벤트 상세 등록</span>
      </div>

      <div className="mt-6 flex flex-col items-center px-6">
        <img src={event.thumbnail} alt="" className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm" />
        <h2 className="text-xl font-bold mt-4">{event.name}</h2>
        <p className="text-xs text-gray-500 mt-1">{event.date} @ {event.location}</p>
      </div>

      <div className="mt-8 bg-gray-50 px-6 py-4">
        <p className="text-sm text-center text-gray-600 font-medium">행사 사진을 찾기 위한 정보를 입력해주세요</p>
      </div>

      <form className="mt-6 px-6 space-y-6 pb-12" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Name *</label>
          <input 
            type="text" 
            placeholder="Enter your Name"
            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">E-Mail Address *</label>
          <input 
            type="email" 
            placeholder="Enter E-mail address"
            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number *</label>
          <input 
            type="tel" 
            placeholder="Enter Mobile Number"
            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Take your Selfie *</label>
          <div className="relative h-72 w-full border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden shadow-inner">
            
            {/* Camera Preview Mode */}
            {isCameraActive && (
              <div className="absolute inset-0 z-20 bg-black">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover scale-x-[-1]" 
                />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8 px-4 z-30">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); stopCamera(); }}
                    className="p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white active:bg-white/30"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    type="button"
                    onClick={takePhoto}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
                  >
                    <div className="w-12 h-12 border-2 border-blue-600 rounded-full bg-white" />
                  </button>
                  <div className="w-12 h-12" /> {/* Layout balance */}
                </div>
              </div>
            )}

            {/* Photo Result Mode */}
            {selfie ? (
              <div className="relative w-full h-full group">
                <img src={selfie} alt="Selfie" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={startCamera}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                  <RotateCcw size={32} className="mb-2" />
                  <span className="text-xs font-bold">다시 촬영하기</span>
                </button>
              </div>
            ) : !isCameraActive && (
              <div 
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full group"
                onClick={startCamera}
              >
                <div className="bg-white p-5 rounded-full shadow-md mb-3 text-gray-400 group-hover:text-blue-500 transition-all group-hover:scale-110">
                  <Camera size={40} />
                </div>
                <p className="text-sm text-gray-400 font-bold">Open Camera</p>
                <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-tight">Tap to take a selfie</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 pt-2">
          <button 
            type="button"
            onClick={() => setAgreed(!agreed)}
            className={`flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${agreed ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-100' : 'bg-white border-gray-300'}`}
          >
            {agreed && <Check size={16} className="text-white stroke-[3px]" />}
          </button>
          <span className="text-[11px] text-gray-500 leading-tight pt-0.5">
            I Agree to the Privacy Policy and give my Consent
          </span>
        </div>

        <button 
          type="button"
          disabled={!isFormValid}
          onClick={onSubmit}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all shadow-lg ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default EventDetail;
