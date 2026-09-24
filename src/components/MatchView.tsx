import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { CHARACTER_LIST, CHARACTERS } from '../data/characters';
import { CharacterId } from '../types/quiz';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager } from '../utils/audio';

export const MatchView: React.FC<{ onStartQuiz: () => void }> = ({ onStartQuiz }) => {
  const [animalA, setAnimalA] = useState<CharacterId>('golden');
  const [animalB, setAnimalB] = useState<CharacterId>('sloth');

  const charA = CHARACTERS[animalA];
  const charB = CHARACTERS[animalB];

  // Procedural fun chemistry generator based on character traits
  const getChemistryData = (idA: CharacterId, idB: CharacterId) => {
    if (idA === idB) {
      return {
        percent: 99,
        badge: 'ร่างโคลนฝาแฝด',
        verdict: 'เข้าขากันอย่างเหลือเชื่อ!',
        description: `เมื่อ ${charA.name} สองตัวมาเจอกันใน StatZoo พลังแห่ง "${charA.tagline}" จะเพิ่มขึ้นเป็นสองเท่า! ไม่ต้องพูดอะไรมากแค่มองตาก็รู้ใจ`,
      };
    }

    // Specific famous pairs in StatZoo
    const pairKey = [idA, idB].sort().join('-');

    if (pairKey === 'horse-zoo_owner') {
      return {
        percent: 88,
        badge: 'คู่สนทนาต่างภาษา',
        verdict: 'คุยคนละภาษาแต่ดันเข้าใจกันเฉย!',
        description: 'ม้าสวนกุหลาบพ่นภาษาอังกฤษไฟแลบ ส่วนเจ้าของสวนสัตว์เชือนๆ ตอบกลับด้วยภาษาใต้แท้ 100% ถึงจะไม่ตรงคีย์แต่เป็นคู่หูที่ตลกและน่ารักที่สุดในสวนสัตว์!',
      };
    }

    if (pairKey === 'golden-pooh') {
      return {
        percent: 95,
        badge: 'คู่หูรอยยิ้ม & เสียงหัวเราะ',
        verdict: 'พลังงานบวกทะลุเพดาน!',
        description: 'โกลเด้น MWIT ขยันปล่อยความสดใสและชวนคุย ส่วนหมีพูก็คอยขำ 5555555 ให้ทุกมุก อยู่ด้วยกันทีไรคนรอบข้างจะอารมณ์ดีตลอดเวลา',
      };
    }

    if (pairKey === 'fish-sloth') {
      return {
        percent: 94,
        badge: 'ก๊วนสโลว์ไลฟ์ & รักสันโดษ',
        verdict: 'ความสงบคือพลังอันสูงสุด',
        description: 'สล็อตเด็กเตรียมอุดมนอนนิ่งๆ ส่วนปลาก็เตรียมวาร์ปกลับบ้าน ทั้งสองแทบไม่ต้องส่งเสียงคุยกัน แค่นั่งข้างกันเงียบๆ ก็รู้สึกสบายใจที่สุดในโลกแล้ว',
      };
    }

    if (pairKey === 'kangaroo-kingkong') {
      return {
        percent: 90,
        badge: 'สายลุยพละกำลังสองเท่า',
        verdict: 'กรงพังแน่นอน!',
        description: 'คิงคองสายสาธิตพลังทำลายล้าง 100% ผนึกกำลังกับจิงโจ้ที่กำลังฟิตซ้อมเตรียมไปเรียน รด. ชวนกันยกเวท วิดพื้น และวิ่งชนทุกปัญหาในคณะ!',
      };
    }

    if (pairKey === 'goat-kingkong') {
      return {
        percent: 62,
        badge: 'คู่กัดสายปั่นประสาท',
        verdict: 'ระวังคิงคองหัวร้อน!',
        description: 'แพะหน้าใสแต่แอบร้าย แอบหยอดมุกแซะเนียนๆ ส่วนคิงคองผู้เปิดเผยก็ตามไม่ทันจนต้องเกาหัวแกรกๆ เป็นสีสันความป่วนประจำสวนสัตว์',
      };
    }

    if (pairKey === 'fish-golden') {
      return {
        percent: 70,
        badge: 'ขั้วบวกปะทะขั้วลบ (Introvert vs Extrovert)',
        verdict: 'วิ่งไล่จับกันทุกเย็น!',
        description: 'โกลเด้น MWIT อยากชวนปลาไปตี้และติวหนังสือต่อ แต่ปลาแอบเปิดสกิลเทเลพอร์ตกลับถึงบ้านเรียบร้อยแล้ว โกลเด้นเลยได้แต่ยืนเกาหูมองหาปลา',
      };
    }

    // Default calculated compatibility
    const intDiff = Math.abs(charA.statScores.intelligence - charB.statScores.intelligence);
    const socDiff = Math.abs(charA.statScores.social - charB.statScores.social);
    const match = Math.max(55, Math.min(96, 100 - Math.round((intDiff + socDiff) / 4)));

    return {
      percent: match,
      badge: 'เพื่อนร่วมสวนสัตว์ StatZoo',
      verdict: match > 80 ? 'เข้ากันได้ดีมาก!' : 'ปรับจูนกันนิดหน่อยแล้วจะเฮฮาสุดๆ!',
      description: `การจับคู่ระหว่าง ${charA.name} (${charA.schoolOrOrigin.split(' ')[0]}) กับ ${charB.name} (${charB.schoolOrOrigin.split(' ')[0]}) นำมาซึ่งบรรยากาศสุดกลมกล่อม ทั้งความ "${charA.traits[0]}" และ "${charB.traits[0]}" ผสมกันได้อย่างลงตัว`,
    };
  };

  const chemistry = getChemistryData(animalA, animalB);

  const swapAnimals = () => {
    soundManager.playPop();
    const temp = animalA;
    setAnimalA(animalB);
    setAnimalB(temp);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
          <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          <span>StatZoo Chemistry Checker</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          ตรวจดวงเคมีคู่ซี้ในสวนสัตว์
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
          เลือกสัตว์ 2 ตัวที่คุณและเพื่อนเป็น เพื่อดูว่าถ้าจับมาอยู่กรงเดียวกันใน StatZoo จะเกิดอะไรขึ้น!
        </p>
      </div>

      {/* Selectors Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center">
          {/* Animal A Selector */}
          <div className="sm:col-span-5 space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              สัตว์ตัวที่ 1 (คุณ)
            </span>
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <CharacterAvatar id={animalA} size="md" />
            </div>
            <select
              value={animalA}
              onChange={(e) => {
                soundManager.playSelect();
                setAnimalA(e.target.value as CharacterId);
              }}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {CHARACTER_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.name} ({c.schoolOrOrigin.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="sm:col-span-1 flex justify-center">
            <button
              onClick={swapAnimals}
              title="สลับสัตว์"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-2xs transition-all active:rotate-180 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Animal B Selector */}
          <div className="sm:col-span-5 space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              สัตว์ตัวที่ 2 (เพื่อน)
            </span>
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <CharacterAvatar id={animalB} size="md" />
            </div>
            <select
              value={animalB}
              onChange={(e) => {
                soundManager.playSelect();
                setAnimalB(e.target.value as CharacterId);
              }}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {CHARACTER_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.name} ({c.schoolOrOrigin.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Compatibility Result Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-amber-50/40 border border-emerald-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-emerald-200/50 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {chemistry.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {chemistry.verdict}
              </h3>
            </div>

            {/* Score Ring */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-emerald-200 shadow-xs">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span className="text-2xl font-black text-slate-900">{chemistry.percent}%</span>
              <span className="text-xs text-slate-500 font-semibold">ความเข้ากัน</span>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {chemistry.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
              <p className="font-bold text-slate-800">{charA.name} พูดว่า:</p>
              <p className="text-slate-500 italic mt-0.5 line-clamp-2">{charA.signatureQuote}</p>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
              <p className="font-bold text-slate-800">{charB.name} ตอบว่า:</p>
              <p className="text-slate-500 italic mt-0.5 line-clamp-2">{charB.signatureQuote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Prompt */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            soundManager.playPop();
            onStartQuiz();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>ยังไม่รู้ว่าตัวเองเป็นตัวไหน? ทำแบบทดสอบเลย</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
