export type CharacterId =
  | 'golden'
  | 'kingkong'
  | 'zoo_owner'
  | 'horse'
  | 'kangaroo'
  | 'pooh'
  | 'sloth'
  | 'goat'
  | 'fish';

export interface TraitScores {
  intelligence: number; // ความฉลาด/วิชาการ
  social: number;       // การเข้าสังคม/เพื่อนเยอะ
  mischief: number;     // ความแสบ/แอบร้าย
  chillSpeed: number;   // สปีดกลับบ้าน/รักสันโดษ
  clumsiness: number;   // ความเอ๋อ/เชือน/มึน
  laughter: number;     // ความเส้นตื้น/ชอบขำ
}

export interface Character {
  id: CharacterId;
  name: string;
  species: string;
  tagline: string;
  schoolOrOrigin: string;
  personality: string;
  detailedBio: string;
  signatureQuote: string;
  traits: string[];
  color: {
    primary: string;
    bg: string;
    border: string;
    text: string;
    gradient: string;
    accent: string;
  };
  bestFriendId: CharacterId;
  bestFriendReason: string;
  rivalId: CharacterId;
  rivalReason: string;
  statScores: TraitScores;
  image?: string;
  emoji: string;
}

export interface QuizOption {
  id: string;
  text: string;
  subtext?: string;
  scores: Partial<Record<CharacterId, number>>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  situation: string;
  category: string;
  options: QuizOption[];
}
