import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Users, Compass, Download } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentView: 'home' | 'quiz' | 'result' | 'roster' | 'match';
  onNavigate: (view: 'home' | 'quiz' | 'roster' | 'match') => void;
  onRestartQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onRestartQuiz,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    soundManager.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) soundManager.playPop();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group text-left cursor-pointer transition-transform active:scale-95"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xs font-bold text-lg">
            🦁
          </span>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              StatZoo
            </span>
          </div>
        </button>

        {/* Zone 2: Nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              currentView === 'home' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            หน้าแรก
          </button>
          <button
            onClick={() => onNavigate('roster')}
            className={`flex items-center gap-1.5 transition-colors hover:text-emerald-700 cursor-pointer ${
              currentView === 'roster' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            ทำเนียบ 9 สัตว์
          </button>
          <button
            onClick={() => onNavigate('match')}
            className={`flex items-center gap-1.5 transition-colors hover:text-emerald-700 cursor-pointer ${
              currentView === 'match' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            <Users className="w-4 h-4 text-emerald-600" />
            ตรวจดวงคู่สัตว์
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="/statzoo-deploy.zip"
            download="statzoo-deploy.zip"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            title="ดาวน์โหลดไฟล์เว็บสำเร็จรูป (.ZIP) ไปลากวางลง Netlify / Vercel ได้ทันที"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>โหลด ZIP เว็บ</span>
          </a>

          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'ปิดเสียงเอฟเฟกต์' : 'เปิดเสียงเอฟเฟกต์'}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title={soundEnabled ? 'เปิดเสียงเอฟเฟกต์อยู่' : 'ปิดเสียงเอฟเฟกต์อยู่'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {currentView === 'quiz' ? (
            <button
              onClick={onRestartQuiz}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              เริ่มทำใหม่
            </button>
          ) : (
            <button
              onClick={() => onNavigate('quiz')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>เริ่มทำแบบทดสอบ</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Secondary Quick Bar */}
      <div className="md:hidden flex items-center justify-around py-2 px-3 border-t border-slate-100 bg-white/70 text-xs font-medium text-slate-600">
        <button
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-1 py-1 px-2 rounded-lg cursor-pointer ${
            currentView === 'home' ? 'text-emerald-700 font-bold bg-emerald-50' : ''
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          หน้าแรก
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className={`flex items-center gap-1 py-1 px-2 rounded-lg cursor-pointer ${
            currentView === 'quiz' ? 'text-emerald-700 font-bold bg-emerald-50' : ''
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          แบบทดสอบ
        </button>
        <button
          onClick={() => onNavigate('roster')}
          className={`flex items-center gap-1 py-1 px-2 rounded-lg cursor-pointer ${
            currentView === 'roster' ? 'text-emerald-700 font-bold bg-emerald-50' : ''
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          9 สัตว์
        </button>
        <button
          onClick={() => onNavigate('match')}
          className={`flex items-center gap-1 py-1 px-2 rounded-lg cursor-pointer ${
            currentView === 'match' ? 'text-emerald-700 font-bold bg-emerald-50' : ''
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          ตรวจคู่ซี้
        </button>
      </div>
    </header>
  );
};
