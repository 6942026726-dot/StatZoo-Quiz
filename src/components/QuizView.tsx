import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { CharacterId } from '../types/quiz';
import { soundManager } from '../utils/audio';

interface QuizViewProps {
  onComplete: (userScores: Record<CharacterId, number>) => void;
  onCancel: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onComplete, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [accumulatedScores, setAccumulatedScores] = useState<Record<CharacterId, number>>({
    golden: 0,
    kingkong: 0,
    zoo_owner: 0,
    horse: 0,
    kangaroo: 0,
    pooh: 0,
    sloth: 0,
    goat: 0,
    fish: 0,
  });

  const question = QUESTIONS[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / QUESTIONS.length) * 100);
  const currentSelectedOptionId = selectedAnswers[currentIdx];

  const handleSelectOption = (optionId: string) => {
    soundManager.playSelect();

    const option = question.options.find((o) => o.id === optionId);
    if (!option) return;

    // Update selected answers tracking
    const newAnswers = { ...selectedAnswers, [currentIdx]: optionId };
    setSelectedAnswers(newAnswers);

    // Recalculate scores from scratch based on all selected answers so back & change works perfectly
    const newScores: Record<CharacterId, number> = {
      golden: 0,
      kingkong: 0,
      zoo_owner: 0,
      horse: 0,
      kangaroo: 0,
      pooh: 0,
      sloth: 0,
      goat: 0,
      fish: 0,
    };

    Object.entries(newAnswers).forEach(([qIdxStr, ansId]) => {
      const qIndex = Number(qIdxStr);
      const q = QUESTIONS[qIndex];
      const opt = q?.options.find((o) => o.id === ansId);
      if (opt && opt.scores) {
        Object.entries(opt.scores).forEach(([charKey, scoreVal]) => {
          const cId = charKey as CharacterId;
          newScores[cId] = (newScores[cId] || 0) + (scoreVal || 0);
        });
      }
    });

    setAccumulatedScores(newScores);

    // If last question, finish!
    if (currentIdx === QUESTIONS.length - 1) {
      setTimeout(() => {
        onComplete(newScores);
      }, 250);
    } else {
      setTimeout(() => {
        setCurrentIdx((prev) => prev + 1);
      }, 220);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      soundManager.playPop();
      setCurrentIdx((prev) => prev - 1);
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      {/* Top Header / Progress */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentIdx === 0 ? 'กลับหน้าแรก' : 'ข้อก่อนหน้า'}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200/60">
            <span>คำถามข้อที่ {currentIdx + 1} จาก {QUESTIONS.length}</span>
          </div>

          <span className="font-mono text-emerald-700 font-bold">{progressPercent}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Category & Situation tag */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
            {question.category}
          </span>
          <p className="text-xs text-slate-400 font-medium">
            {question.situation}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug pt-1">
            {question.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {question.options.map((opt, idx) => {
            const isSelected = currentSelectedOptionId === opt.id;
            const letters = ['ก', 'ข', 'ค', 'ง'];

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 group relative ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50/70'
                }`}
              >
                {/* Index badge */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                  }`}
                >
                  {letters[idx] || idx + 1}
                </div>

                {/* Option text */}
                <div className="flex-1 space-y-1">
                  <p className={`text-sm sm:text-base font-semibold leading-relaxed ${
                    isSelected ? 'text-emerald-950 font-bold' : 'text-slate-800'
                  }`}>
                    {opt.text}
                  </p>
                  {opt.subtext && (
                    <p className="text-xs text-slate-500 leading-normal">
                      {opt.subtext}
                    </p>
                  )}
                </div>

                {/* Radio check icon */}
                <div className="shrink-0 mt-0.5">
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-emerald-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom helper tip */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            ตอบตามความรู้สึกจริง เพื่อผลลัพธ์ที่แม่นยำที่สุด
          </span>

          {currentSelectedOptionId && currentIdx < QUESTIONS.length - 1 && (
            <button
              onClick={() => {
                soundManager.playPop();
                setCurrentIdx((prev) => prev + 1);
              }}
              className="text-emerald-700 font-semibold flex items-center gap-1 hover:text-emerald-800 cursor-pointer"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
