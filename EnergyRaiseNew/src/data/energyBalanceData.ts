// Energy Balance Data Types and Dummy Data

export interface EnergyLevel {
  type: 'emotional' | 'physical' | 'mental';
  name: string;
  emoji: string;
  percentage: number;
  status: 'Bun' | 'Moderat' | 'Scăzut';
  trend: 'Stabil' | 'În creștere' | 'Scăzut';
  color: string;
  icon: string;
}

export interface EnergyBalanceData {
  date: string;
  dayName: string;
  overallAverage: number;
  focusArea: {
    type: 'emotional' | 'physical' | 'mental';
    name: string;
    emoji: string;
  };
  energyLevels: EnergyLevel[];
  weeklyTip: {
    title: string;
    content: string;
    icon: string;
  };
  affirmation: {
    text: string;
    category: string;
  };
  summary: {
    generalAverage: number;
    focusAreaText: string;
    recommendations: string;
  };
}

export interface EnergyQuiz {
  id: string;
  title: string;
  description: string;
  type: 'primary' | 'secondary';
  icon: string;
  estimatedTime: string;
}

// Dummy Energy Balance Data
export const energyBalanceData: EnergyBalanceData = {
  date: '5 august 2025',
  dayName: 'Marți',
  overallAverage: 60,
  focusArea: {
    type: 'physical',
    name: 'Fizic',
    emoji: '🏃',
  },
  energyLevels: [
    {
      type: 'emotional',
      name: 'Emotional',
      emoji: '❤️',
      percentage: 65,
      status: 'Bun',
      trend: 'Stabil',
      color: '#E07A5F',
      icon: '💔',
    },
    {
      type: 'physical',
      name: 'Fizic',
      emoji: '⚡',
      percentage: 40,
      status: 'Moderat',
      trend: 'Scăzut',
      color: '#F4A261',
      icon: '🏃',
    },
    {
      type: 'mental',
      name: 'Mental',
      emoji: '🧠',
      percentage: 75,
      status: 'Bun',
      trend: 'În creștere',
      color: '#A3C9A8',
      icon: '🧠',
    },
  ],
  weeklyTip: {
    title: 'Sfat săptămânal:',
    content:
      'Completează un quiz săptămânal pentru a avea o imagine clară asupra evoluției tale energetice.',
    icon: '💡',
  },
  affirmation: {
    text: 'Sunt în echilibru cu energia mea interioară',
    category: 'Afirmația pentru Echilibru',
  },
  summary: {
    generalAverage: 60,
    focusAreaText: 'Fizic',
    recommendations:
      'Energia ta este echilibrată. Mici ajustări pot aduce îmbunătățiri.',
  },
};

// Available Energy Quizzes
export const energyQuizzes: EnergyQuiz[] = [
  {
    id: 'emotional-evaluation',
    title: 'Quiz de Evaluare Emoțională',
    description:
      'Evaluează-ți starea emoțională actuală și primește recomandări personalizate.',
    type: 'primary',
    icon: '🧠',
    estimatedTime: '5-8 min',
  },
  {
    id: 'emotion-test',
    title: 'Test Emoții',
    description: 'Test rapid pentru identificarea emoțiilor predominante.',
    type: 'secondary',
    icon: '❤️',
    estimatedTime: '3-5 min',
  },
  {
    id: 'physical-evaluation',
    title: 'Evaluare Fizică',
    description: 'Analizează nivelul tău de energie fizică și vitalitate.',
    type: 'secondary',
    icon: '⚡',
    estimatedTime: '4-6 min',
  },
];

// Affirmation Pool for Random Generation
export const affirmationPool: string[] = [
  'Sunt în echilibru cu energia mea interioară',
  'Fiecare zi îmi aduce mai multă claritate și pace',
  'Îmi accept și îmi înțeleg emoțiile cu compasiune',
  'Energia mea crește și se regenerează în mod natural',
  'Sunt recunoscător pentru forța și reziliența mea',
  'Îmi permit să mă odihnesc și să mă reîncarc',
  'Fiecare respirație îmi aduce liniște și echilibru',
  'Sunt în armonie cu corpul și mintea mea',
  'Îmi aleg gândurile care îmi susțin energia pozitivă',
  'Sunt creator al propriei mele stări de bine',
];

// Helper function to get random affirmation
export const getRandomAffirmation = (): string => {
  const randomIndex = Math.floor(Math.random() * affirmationPool.length);
  return affirmationPool[randomIndex];
};

// Helper function to get energy level color based on percentage
export const getEnergyLevelColor = (percentage: number): string => {
  if (percentage >= 70) return '#A3C9A8'; // Green - Good
  if (percentage >= 50) return '#F4A261'; // Orange - Moderate
  return '#E07A5F'; // Red - Low
};

// Helper function to get energy status text
export const getEnergyStatusText = (
  percentage: number,
): 'Bun' | 'Moderat' | 'Scăzut' => {
  if (percentage >= 70) return 'Bun';
  if (percentage >= 50) return 'Moderat';
  return 'Scăzut';
};

// Helper function to format current date in Romanian
export const getCurrentDateFormatted = (): {
  date: string;
  dayName: string;
} => {
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

  return {
    dayName,
    date: `${day} ${month} ${year}`,
  };
};
