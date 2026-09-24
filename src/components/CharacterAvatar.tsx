import React, { useState } from 'react';
import { CharacterId } from '../types/quiz';
import { CHARACTERS } from '../data/characters';

interface CharacterAvatarProps {
  id: CharacterId;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'card';
  className?: string;
  showBadge?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  id,
  size = 'md',
  className = '',
  showBadge = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const char = CHARACTERS[id] || CHARACTERS.golden;

  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
    xl: 'w-32 h-32 text-6xl',
    card: 'w-full h-48 sm:h-56',
  }[size];

  // Specific custom SVG icons / illustrations for each character
  const renderIllustratedMascot = () => {
    switch (id) {
      case 'golden':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-amber-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none animate-bounce" style={{ animationDuration: '3s' }}>🐕</span>
            <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              MWIT
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-amber-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              👓 แว่นเด็กเรียน
            </div>
          </div>
        );
      case 'kingkong':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-slate-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none">🦍</span>
            <div className="absolute top-2 right-2 bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              รร.สาธิต
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              💪 พลัง 100%
            </div>
          </div>
        );
      case 'zoo_owner':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-teal-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none">🤠</span>
            <div className="absolute top-2 right-2 bg-teal-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              คนใต้แท้
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              🌀 เชือนสุดในก๊วน
            </div>
          </div>
        );
      case 'horse':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-rose-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none">🐎</span>
            <div className="absolute top-2 right-2 bg-rose-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              สวนกุหลาบ
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-rose-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              🗣️ English Only
            </div>
          </div>
        );
      case 'kangaroo':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-orange-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none animate-pulse">🦘</span>
            <div className="absolute top-2 right-2 bg-orange-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              ว่าที่ รด.
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-orange-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              🪖 ฟิตซ้อมฝึกแถว
            </div>
          </div>
        );
      case 'pooh':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-yellow-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none">🐻</span>
            <div className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              ฝ่ายบันเทิง
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-amber-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              🤣 555555555
            </div>
          </div>
        );
      case 'sloth':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-emerald-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none">🦥</span>
            <div className="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              เตรียมอุดม
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-emerald-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              💤 เทพเงียบท็อปเซค
            </div>
          </div>
        );
      case 'goat':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-purple-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none">🐐</span>
            <div className="absolute top-2 right-2 bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              สายลับหน้าใส
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-purple-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              😈 ติ๋มแต่แอบร้าย
            </div>
          </div>
        );
      case 'fish':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-sky-100 rounded-2xl overflow-hidden">
            <span className="text-5xl select-none">🐟</span>
            <div className="absolute top-2 right-2 bg-sky-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              รักสันโดษ
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 text-sky-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              🏃💨 วาร์ปกลับบ้าน
            </div>
          </div>
        );
    }
  };

  // If size is 'card' and image exists, render high-res image with fallback
  if (size === 'card') {
    if (char.image && !imageError) {
      return (
        <div className={`relative overflow-hidden rounded-2xl border ${char.color.border} ${className}`}>
          <img
            src={char.image}
            alt={char.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-4">
            <div>
              <span className="text-white text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md">
                {char.schoolOrOrigin}
              </span>
              <p className="text-white font-bold text-lg mt-1">{char.name}</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={`relative overflow-hidden rounded-2xl border ${char.color.border} ${className}`}>
        {renderIllustratedMascot()}
      </div>
    );
  }

  // Circular / rounded avatar badge
  return (
    <div className={`relative shrink-0 ${sizeClasses} ${className}`}>
      {char.image && !imageError ? (
        <img
          src={char.image}
          alt={char.name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover rounded-2xl border-2 border-white shadow-sm"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center rounded-2xl shadow-xs border ${char.color.border} ${char.color.bg}`}
        >
          <span className="select-none">{char.emoji}</span>
        </div>
      )}

      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full text-white shadow-xs"
          style={{ backgroundColor: char.color.primary }}
        >
          {char.name}
        </span>
      )}
    </div>
  );
};
