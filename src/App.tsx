import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { RosterView } from './components/RosterView';
import { MatchView } from './components/MatchView';
import { CharacterId } from './types/quiz';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'result' | 'roster' | 'match'>('home');
  const [resultCharacterId, setResultCharacterId] = useState<CharacterId>('golden');
  const [resultScores, setResultScores] = useState<Record<CharacterId, number>>({
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
  const [rosterSelectedChar, setRosterSelectedChar] = useState<CharacterId | null>(null);

  const handleStartQuiz = () => {
    soundManager.playPop();
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (scores: Record<CharacterId, number>) => {
    setResultScores(scores);

    // Calculate highest scoring character
    let bestChar: CharacterId = 'golden';
    let highestScore = -1;

    (Object.keys(scores) as CharacterId[]).forEach((charId) => {
      const score = scores[charId] || 0;
      if (score > highestScore) {
        highestScore = score;
        bestChar = charId;
      }
    });

    setResultCharacterId(bestChar);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCharacterDetail = (charId: CharacterId) => {
    soundManager.playPop();
    setRosterSelectedChar(charId);
    setCurrentView('roster');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#1E293B] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Universal Top Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          soundManager.playPop();
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRestartQuiz={() => {
          soundManager.playPop();
          setCurrentView('quiz');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <HeroSection
            onStartQuiz={handleStartQuiz}
            onExploreRoster={() => {
              setRosterSelectedChar(null);
              setCurrentView('roster');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            onComplete={handleQuizComplete}
            onCancel={() => {
              soundManager.playPop();
              setCurrentView('home');
            }}
          />
        )}

        {currentView === 'result' && (
          <ResultView
            characterId={resultCharacterId}
            scores={resultScores}
            onRetake={handleStartQuiz}
            onExploreRoster={() => {
              setRosterSelectedChar(null);
              setCurrentView('roster');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewCharacterDetail={handleViewCharacterDetail}
          />
        )}

        {currentView === 'roster' && (
          <RosterView
            onStartQuiz={handleStartQuiz}
            selectedCharId={rosterSelectedChar}
          />
        )}

        {currentView === 'match' && (
          <MatchView onStartQuiz={handleStartQuiz} />
        )}
      </main>

      {/* Quiet, unpretentious footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">StatZoo • สวนสัตว์สถิติ</span>
            <span>·</span>
            <span>แบบทดสอบบุคลิกภาพ 9 สัตว์ตัวตึง</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>MWIT · สาธิต · เตรียมอุดม · สวนกุหลาบ · ปักษ์ใต้</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
