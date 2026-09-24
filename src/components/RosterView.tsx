import React, { useState } from 'react';
import { Sparkles, X, HeartHandshake, ShieldAlert, BookOpen, Quote, Filter } from 'lucide-react';
import { CHARACTER_LIST, CHARACTERS } from '../data/characters';
import { Character, CharacterId } from '../types/quiz';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager } from '../utils/audio';

interface RosterViewProps {
  onStartQuiz: () => void;
  selectedCharId?: CharacterId | null;
}

export const RosterView: React.FC<RosterViewProps> = ({
  onStartQuiz,
  selectedCharId: initialSelectedCharId,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'academic' | 'funny' | 'speed'>('all');
  const [modalCharacter, setModalCharacter] = useState<Character | null>(
    initialSelectedCharId ? CHARACTERS[initialSelectedCharId] : null
  );

  const filterTabs = [
    { id: 'all', label: 'ทั้งหมด (9 ตัว)' },
    { id: 'academic', label: 'สายหัวกะทิ & รร.ดัง' },
    { id: 'funny', label: 'สายเฮฮา & ตัวปั่น' },
    { id: 'speed', label: 'สายลุย & กลับบ้านไว' },
  ] as const;

  const filteredList = CHARACTER_LIST.filter((char) => {
    if (activeFilter === 'academic') {
      return ['golden', 'sloth', 'horse', 'kingkong'].includes(char.id);
    }
    if (activeFilter === 'funny') {
      return ['zoo_owner', 'pooh', 'goat'].includes(char.id);
    }
    if (activeFilter === 'speed') {
      return ['fish', 'kangaroo', 'kingkong'].includes(char.id);
    }
    return true;
  });

  const openModal = (char: Character) => {
    soundManager.playPop();
    setModalCharacter(char);
  };

  const closeModal = () => {
    soundManager.playPop();
    setModalCharacter(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>StatZoo Official Lore & Registry</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          ทำเนียบชาวสวนสัตว์ทั้ง 9 คาแรกเตอร์
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          รวมประวัติและเอกลักษณ์เฉพาะตัวของเพื่อนๆ ใน StatZoo ไม่ว่าจะเป็นเด็ก MWIT, เตรียมอุดม, สวนกุหลาบ, สาธิต หรือเชือนตัวตึงแดนใต้!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playPop();
                setActiveFilter(tab.id);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 9 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((char) => (
          <div
            key={char.id}
            onClick={() => openModal(char)}
            className={`bg-white rounded-3xl border p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-1 ${char.color.border}`}
          >
            <div className="space-y-4">
              {/* Header with Avatar & Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CharacterAvatar id={char.id} size="md" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {char.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {char.species}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {char.schoolOrOrigin.split(' ')[0]}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs font-semibold text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100/60 leading-relaxed">
                “{char.tagline}”
              </p>

              {/* Bio snippet */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {char.detailedBio}
              </p>

              {/* Traits tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {char.traits.slice(0, 3).map((tr, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                  >
                    {tr}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Quote className="w-3 h-3" />
                คำพูดติดปาก
              </span>
              <span className="text-emerald-700 font-bold group-hover:underline">
                อ่านข้อมูลเต็ม &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA to take Quiz */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white text-center space-y-4 shadow-sm">
        <h3 className="text-xl sm:text-2xl font-bold">
          อยากรู้ว่าตัวตนจริงของคุณตรงกับสัตว์ตัวไหนใน 9 ตัวนี้?
        </h3>
        <p className="text-emerald-100 text-sm max-w-lg mx-auto">
          ทำแบบทดสอบ 8 ข้อ ใช้เวลาเพียง 2 นาที แล้วมาดูคำตอบกันเลย!
        </p>
        <button
          onClick={() => {
            soundManager.playPop();
            onStartQuiz();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-800 font-bold text-sm rounded-2xl shadow-md hover:bg-emerald-50 transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>เริ่มทำแบบทดสอบทันที</span>
        </button>
      </div>

      {/* Character Details Modal */}
      {modalCharacter && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className={`p-5 text-white flex items-center justify-between bg-gradient-to-r ${modalCharacter.color.gradient}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{modalCharacter.emoji}</span>
                <div>
                  <h3 className="text-xl font-black">{modalCharacter.name}</h3>
                  <p className="text-xs text-white/80">{modalCharacter.species}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  🏫 {modalCharacter.schoolOrOrigin}
                </span>
                <p className="text-sm font-semibold text-slate-800 pt-2">
                  {modalCharacter.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {modalCharacter.detailedBio}
                </p>
              </div>

              {/* Quote */}
              <div className="bg-slate-50 border-l-4 border-emerald-500 p-3.5 rounded-r-xl">
                <p className="text-xs text-slate-500 font-bold uppercase">คำพูดติดปาก:</p>
                <p className="text-sm font-medium text-slate-800 italic mt-0.5">
                  {modalCharacter.signatureQuote}
                </p>
              </div>

              {/* Traits List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">ลักษณะเด่น:</p>
                <div className="flex flex-wrap gap-1.5">
                  {modalCharacter.traits.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                    >
                      ✨ {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best Friend & Rival */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="flex items-center gap-1 font-bold text-emerald-800 mb-1">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>เพื่อนซี้</span>
                  </div>
                  <p className="font-semibold text-slate-800">
                    {CHARACTERS[modalCharacter.bestFriendId].name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {modalCharacter.bestFriendReason}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                  <div className="flex items-center gap-1 font-bold text-rose-800 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>คู่กัด</span>
                  </div>
                  <p className="font-semibold text-slate-800">
                    {CHARACTERS[modalCharacter.rivalId].name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {modalCharacter.rivalReason}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
