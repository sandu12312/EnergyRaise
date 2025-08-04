// Journal data types and dummy data for the journal feature

export interface Emotion {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  emotion: Emotion;
  content: string;
  timestamp: Date;
}

export interface CalendarDay {
  date: number;
  hasEntry: boolean;
  isToday: boolean;
  entry?: JournalEntry;
}

// Available emotions for selection
export const emotions: Emotion[] = [
  { id: 'happy', name: 'Fericit', emoji: '😊', color: '#A3C9A8' },
  { id: 'relaxed', name: 'Relaxat', emoji: '😌', color: '#8B9DC3' },
  { id: 'tired', name: 'Obosit', emoji: '😴', color: '#D4A574' },
  { id: 'stressed', name: 'Stresat', emoji: '😤', color: '#E07A5F' },
  { id: 'reflective', name: 'Reflectiv', emoji: '🤔', color: '#81B29A' },
  { id: 'anxious', name: 'Anxios', emoji: '😰', color: '#F2CC8F' },
  { id: 'energic', name: 'Energic', emoji: '💪', color: '#3D5A80' },
  { id: 'sad', name: 'Trist', emoji: '😢', color: '#98C1D9' },
  { id: 'excited', name: 'Entuziasmat', emoji: '🎉', color: '#EE6C4D' },
  { id: 'neutral', name: 'Neutru', emoji: '😐', color: '#6C757D' },
  { id: 'inspired', name: 'Inspirat', emoji: '✨', color: '#F4A261' },
  { id: 'overwhelmed', name: 'Copleșit', emoji: '😵', color: '#264653' },
];

// Dummy journal entries
export const journalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '29 Ian',
    emotion: emotions[0], // Fericit
    content: 'Zi minunată cu multă energie și optimism!',
    timestamp: new Date('2025-01-29'),
  },
  {
    id: '2',
    date: '28 Ian',
    emotion: emotions[1], // Relaxat
    content: 'Am avut o zi liniștită, perfectă pentru meditație.',
    timestamp: new Date('2025-01-28'),
  },
  {
    id: '3',
    date: '27 Ian',
    emotion: emotions[3], // Stresat
    content: 'Ziua a fost provocatoare, dar am reușit să mă adaptez.',
    timestamp: new Date('2025-01-27'),
  },
];

// Generate calendar data for the current month
export const generateCalendarData = (
  month: number,
  year: number,
): CalendarDay[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const calendarDays: CalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const isToday =
      currentDate.getDate() === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    // Check if there's an entry for this day
    const entry = journalEntries.find(entry => {
      const entryDate = entry.timestamp;
      return (
        entryDate.getDate() === day &&
        entryDate.getMonth() === month &&
        entryDate.getFullYear() === year
      );
    });

    calendarDays.push({
      date: day,
      hasEntry: !!entry,
      isToday,
      entry,
    });
  }

  return calendarDays;
};

// Journal prompts for inspiration
export const journalPrompts = [
  'Cum a fost ziua ta? Ce s-a întâmplat special? Cum te-ai simțit și de ce? Scrie orice îți vine în minte...',
  'Ce te-a făcut să zâmbești astăzi?',
  'Descrie un moment din ziua de astăzi care te-a marcat.',
  'Pentru ce ești recunoscător astăzi?',
  'Ce ai învățat nou despre tine astăzi?',
];

export const getCurrentDateFormatted = (): string => {
  const today = new Date();
  const days = [
    'Duminică',
    'Luni',
    'Marți',
    'Miercuri',
    'Joi',
    'Vineri',
    'Sâmbătă',
  ];
  const months = [
    'ianuarie',
    'februarie',
    'martie',
    'aprilie',
    'mai',
    'iunie',
    'iulie',
    'august',
    'septembrie',
    'octombrie',
    'noiembrie',
    'decembrie',
  ];

  const dayName = days[today.getDay()];
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};
