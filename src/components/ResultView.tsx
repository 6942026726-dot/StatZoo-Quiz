import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Share2, RotateCcw, Copy, Check, Sparkles, BookOpen, Users, 
  Download, Award, HeartHandshake, ShieldAlert 
} from 'lucide-react';
import { CharacterId } from '../types/quiz';
import { CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager } from '../utils/audio';

interface ResultViewProps {
  characterId: CharacterId;
  scores: Record<CharacterId, number>;
  onRetake: () => void;
  onExploreRoster: () => void;
  onViewCharacterDetail: (charId: CharacterId) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  characterId,
  scores,
  onRetake,
  onExploreRoster,
  onViewCharacterDetail,
}) => {
  const character = CHARACTERS[characterId] || CHARACTERS.golden;
  const bestFriend = CHARACTERS[character.bestFriendId];
  const rival = CHARACTERS[character.rivalId];
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'],
      });
    } catch {
      // safe
    }
  }, []);

  const handleCopyText = async () => {
    soundManager.playPop();
    const shareText = `🎉 ผลการทดสอบ StatZoo ของฉันคือ: [${character.name} - ${character.species}]\n` +
      `🏷️ ฉายา: ${character.tagline}\n` +
      `🏫 สังกัด: ${character.schoolOrOrigin}\n` +
      `💬 คำพูดติดปาก: ${character.signatureQuote}\n\n` +
      `คุณเป็นตัวอะไรใน StatZoo? มาลองทำแบบทดสอบกัน! 🦁🌿`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    soundManager.playPop();
    const shareData = {
      title: `ฉันได้ ${character.name} ในแบบทดสอบ StatZoo!`,
      text: `ผลทดสอบ StatZoo: ฉันได้ ${character.name} (${character.schoolOrOrigin}) - "${character.signatureQuote}"`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // cancelled by user
      }
    } else {
      handleCopyText();
    }
  };

  // Generate downloadable high-res image of the StatZoo citizen card using HTML5 Canvas
  const handleDownloadCard = () => {
    soundManager.playPop();
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1000;
      canvas.height = 1250;

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1250);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(1, '#F0FDF4');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1000, 1250);

      // Border & Header Band
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#10B981';
      ctx.strokeRect(30, 30, 940, 1190);

      ctx.fillStyle = '#065F46';
      ctx.fillRect(30, 30, 940, 140);

      // Header Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STATZOO RESIDENT ID CARD', 500, 95);

      ctx.font = '22px sans-serif';
      ctx.fillStyle = '#A7F3D0';
      ctx.fillText('บัตรประจำตัวประชาชนชาวสวนสัตว์สถิติ', 500, 138);

      // Character Emoji / Badge
      ctx.font = '130px sans-serif';
      ctx.fillText(character.emoji, 500, 330);

      // Name & Title
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 54px sans-serif';
      ctx.fillText(character.name, 500, 420);

      ctx.font = 'bold 26px sans-serif';
      ctx.fillStyle = '#047857';
      ctx.fillText(`[ ${character.schoolOrOrigin} ]`, 500, 470);

      ctx.font = 'italic 28px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(character.tagline, 500, 520);

      // Bio Box
      ctx.fillStyle = '#F8FAFC';
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 560, 840, 190, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ลักษณะนิสัยประจำตัว:', 110, 605);

      ctx.fillStyle = '#475569';
      ctx.font = '22px sans-serif';
      // Simple multi-line wrap
      const bioWords = character.personality;
      ctx.fillText(bioWords, 110, 650);

      ctx.font = 'italic 20px sans-serif';
      ctx.fillStyle = '#065F46';
      ctx.fillText(character.signatureQuote.slice(0, 55) + '...', 110, 705);

      // Traits Meters
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('ดัชนีชี้วัดบุคลิกภาพ (Trait Stats):', 80, 800);

      const stats = [
        { label: 'ความฉลาด / วิชาการ', val: character.statScores.intelligence },
        { label: 'การเข้าสังคม / มิตรภาพ', val: character.statScores.social },
        { label: 'ความเอ๋อ / เชือน / เหร๋อ', val: character.statScores.clumsiness },
        { label: 'ความแสบ / แอบร้ายเงียบ', val: character.statScores.mischief },
        { label: 'สปีดวาร์ปกลับบ้านไว', val: character.statScores.chillSpeed },
      ];

      stats.forEach((st, i) => {
        const yPos = 845 + i * 50;
        ctx.fillStyle = '#334155';
        ctx.font = '20px sans-serif';
        ctx.fillText(st.label, 80, yPos);

        // Progress bar background
        ctx.fillStyle = '#E2E8F0';
        ctx.beginPath();
        ctx.roundRect(400, yPos - 18, 450, 24, 12);
        ctx.fill();

        // Fill bar
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.roundRect(400, yPos - 18, (450 * st.val) / 100, 24, 12);
        ctx.fill();

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(`${st.val}%`, 870, yPos);
      });

      // Footer
      ctx.textAlign = 'center';
      ctx.fillStyle = '#64748B';
      ctx.font = '20px sans-serif';
      ctx.fillText('StatZoo • สวนสัตว์สถิติ • ค้นหาตัวตนของคุณวันนี้', 500, 1170);

      // Download trigger
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `StatZoo_${character.id}_CitizenCard.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // safe
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* Result Announcement */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ผลการทดสอบ StatZoo ของคุณ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          คุณคือ “{character.name}” แห่ง StatZoo!
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
          {character.tagline}
        </p>
      </div>

      {/* Main Character ID Card */}
      <div
        ref={cardRef}
        className={`bg-white rounded-3xl border-2 shadow-lg overflow-hidden transition-all ${character.color.border}`}
      >
        {/* Card Header Ribbon */}
        <div className={`p-4 sm:p-5 text-white flex items-center justify-between bg-gradient-to-r ${character.color.gradient}`}>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="font-bold text-xs sm:text-sm tracking-wider uppercase">
              StatZoo Citizen ID Card
            </span>
          </div>
          <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold">
            {character.schoolOrOrigin}
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Profile Lockup */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
              <CharacterAvatar id={character.id} size="xl" className="w-full h-full shadow-md" />
            </div>

            <div className="text-center sm:text-left space-y-2.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {character.name}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {character.species}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl inline-block">
                🏫 สังกัด / ที่มา: {character.schoolOrOrigin}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {character.detailedBio}
              </p>
            </div>
          </div>

          {/* Signature Quote */}
          <div className="bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-r-2xl space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              คำพูดติดปากประจำตัว
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-800 italic">
              {character.signatureQuote}
            </p>
          </div>

          {/* Traits Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ลักษณะเด่นประจำตัว
            </span>
            <div className="flex flex-wrap gap-2">
              {character.traits.map((tr, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
                >
                  ✨ {tr}
                </span>
              ))}
            </div>
          </div>

          {/* Trait Radar Bars */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ดัชนีคะแนนบุคลิกภาพ (Personality Meters)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">🧠 ความฉลาด / วิชาการ</span>
                  <span className="text-emerald-700 font-bold">{character.statScores.intelligence}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${character.statScores.intelligence}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">🤝 มิตรภาพ / เข้าสังคม</span>
                  <span className="text-amber-700 font-bold">{character.statScores.social}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${character.statScores.social}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">🌀 ความเอ๋อ / เชือน / เหร๋อ</span>
                  <span className="text-teal-700 font-bold">{character.statScores.clumsiness}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full"
                    style={{ width: `${character.statScores.clumsiness}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">😈 ความแสบ / แอบร้ายเงียบ</span>
                  <span className="text-purple-700 font-bold">{character.statScores.mischief}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${character.statScores.mischief}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">🏃💨 สปีดวาร์ปกลับบ้านไว</span>
                  <span className="text-sky-700 font-bold">{character.statScores.chillSpeed}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${character.statScores.chillSpeed}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">🤣 ระดับความเส้นตื้น / ชอบขำ</span>
                  <span className="text-yellow-700 font-bold">{character.statScores.laughter}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${character.statScores.laughter}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Chemistry: Best Friend & Rival */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            {/* Best Friend */}
            <div
              onClick={() => onViewCharacterDetail(character.bestFriendId)}
              className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>เพื่อนซี้ประจำสวนสัตว์</span>
              </div>
              <div className="flex items-center gap-3">
                <CharacterAvatar id={bestFriend.id} size="sm" />
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {bestFriend.name} ({bestFriend.schoolOrOrigin.split(' ')[0]})
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {character.bestFriendReason}
                  </p>
                </div>
              </div>
            </div>

            {/* Rival */}
            <div
              onClick={() => onViewCharacterDetail(character.rivalId)}
              className="p-4 rounded-2xl border border-rose-200 bg-rose-50/60 hover:bg-rose-50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>คู่กัด / สิ่งที่ขัดใจประจำกรง</span>
              </div>
              <div className="flex items-center gap-3">
                <CharacterAvatar id={rival.id} size="sm" />
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-rose-700 transition-colors">
                    {rival.name} ({rival.schoolOrOrigin.split(' ')[0]})
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {character.rivalReason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            แชร์ผลลัพธ์ให้เพื่อนๆ ในก๊วนรู้!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอกข้อความ'}</span>
          </button>

          <button
            onClick={handleDownloadCard}
            disabled={downloading}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'กำลังสร้างการ์ด...' : 'บันทึกรูปบัตร ID'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl transition-colors shadow-xs cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>แชร์ผลลัพธ์</span>
          </button>

          <button
            onClick={onRetake}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทำใหม่อีกครั้ง</span>
          </button>
        </div>
      </div>

      {/* Discover more footer links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-medium text-slate-500">
        <button
          onClick={onExploreRoster}
          className="flex items-center gap-1.5 text-emerald-700 hover:underline cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>ดูทำเนียบสัตว์ทั้งหมด 9 ตัวใน StatZoo</span>
        </button>
      </div>
    </div>
  );
};
