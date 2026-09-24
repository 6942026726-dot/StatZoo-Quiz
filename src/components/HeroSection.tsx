import React from 'react';
import { ArrowRight, Sparkles, HelpCircle, Trophy, Zap } from 'lucide-react';
import { HERO_IMAGE, CHARACTER_LIST } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onExploreRoster: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onExploreRoster,
}) => {
  return (
    <section className="relative overflow-hidden py-8 md:py-14">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-emerald-100/50 via-teal-50/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Hero Card Container */}
        <div className="bg-white rounded-3xl border border-emerald-100/80 shadow-sm overflow-hidden p-6 md:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>StatZoo Personality Test 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                คุณเป็นตัวอะไรใน <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600">StatZoo?</span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                แบบทดสอบวัดบุคลิกภาพสุดปั่นแต่ตรงเผง! คุณคือ <span className="font-semibold text-amber-700">โกลเด้น MWIT</span> ผู้ฉลาดสดใส, 
                <span className="font-semibold text-slate-700"> คิงคองสาธิต</span> จอมพลัง, 
                <span className="font-semibold text-teal-700"> เจ้าของสวนสัตว์</span> สุดเอ๋อคนใต้, 
                <span className="font-semibold text-rose-700"> ม้าอาชาไนย</span> ผู้ดีสวนกุหลาบ หรืออีก 5 สัตว์ตัวตึงในก๊วน?
              </p>

              {/* Quick Perks / Info */}
              <div className="grid grid-cols-3 gap-3 py-2">
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>8 ข้อ</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">ใช้เวลาเพียง 2 นาที</p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold text-sm">
                    <Trophy className="w-4 h-4" />
                    <span>9 สายพันธุ์</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">คาแรกเตอร์สุดเป๊ะ</p>
                </div>

                <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-100">
                  <div className="flex items-center gap-1.5 text-teal-700 font-bold text-sm">
                    <HelpCircle className="w-4 h-4" />
                    <span>ดวงคู่ซี้</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">เช็คเคมีเพื่อนร่วมกรง</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    soundManager.playPop();
                    onStartQuiz();
                  }}
                  className="group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>เริ่มทำแบบทดสอบเลย</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    soundManager.playPop();
                    onExploreRoster();
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer"
                >
                  <span>ทำเนียบ 9 สัตว์</span>
                </button>
              </div>
            </div>

            {/* Right Graphic Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] group">
                <img
                  src={HERO_IMAGE}
                  alt="StatZoo Safari Entrance"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/80 text-white backdrop-blur-xs">
                      ยินดีต้อนรับสู่สวนสัตว์สถิติ
                    </span>
                  </div>
                  <p className="text-white text-base font-bold mt-1">
                    9 บุคลิกภาพตัวตึงแห่ง StatZoo
                  </p>
                  <p className="text-slate-200 text-xs mt-0.5">
                    ทำแบบทดสอบเพื่อค้นพบสัญลักษณ์ประจำตัวของคุณและเพื่อนๆ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Animals Mini Showcase Carousel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">
                ชาวสวนสัตว์ทั้ง 9 ตัว (The 9 StatZoo Inhabitants)
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                แตะดูคาแรกเตอร์เด่นก่อนเริ่มทำแบบทดสอบ
              </p>
            </div>
            <button
              onClick={onExploreRoster}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>ดูข้อมูลทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5 md:gap-3">
            {CHARACTER_LIST.map((char) => (
              <div
                key={char.id}
                onClick={() => {
                  soundManager.playPop();
                  onExploreRoster();
                }}
                className={`p-3 rounded-2xl border transition-all text-center cursor-pointer group hover:-translate-y-1 hover:shadow-md ${char.color.bg} ${char.color.border}`}
              >
                <div className="mx-auto w-12 h-12 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  <CharacterAvatar id={char.id} size="sm" />
                </div>
                <p className="text-xs font-bold text-slate-800 mt-2 truncate">
                  {char.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  {char.schoolOrOrigin.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
