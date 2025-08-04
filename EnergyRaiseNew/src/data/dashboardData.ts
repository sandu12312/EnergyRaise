// Dashboard Dummy Data

export interface CrystalProgress {
  current: number;
  total: number;
  tier: 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  nextTier: string;
  description: string;
}

export interface EnergyBalance {
  emotional: number;
  physical: number;
  mental: number;
  timeUntilReset: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  reward: number; // crystals earned
}

export interface Remedy {
  id: string;
  title: string;
  description: string;
  type: 'tea' | 'oil' | 'supplement';
  duration: string;
  image: string;
}

export interface DashboardData {
  user: {
    name: string;
    greeting: string;
  };
  crystalProgress: CrystalProgress;
  energyBalance: EnergyBalance;
  dailyChecklist: ChecklistItem[];
  remedies: Remedy[];
  energySummary: {
    message: string;
    suggestion: string;
  };
}

// Dummy Data Export
export const dashboardData: DashboardData = {
  user: {
    name: 'Ana',
    greeting: 'Bună ziua',
  },
  crystalProgress: {
    current: 36,
    total: 50,
    tier: 'Silver',
    nextTier: 'Gold',
    description:
      'Cristalele tale reflectă consecvența ta. Avansează pentru pachete naturiste cu reducere.',
  },
  energyBalance: {
    emotional: 65,
    physical: 40,
    mental: 75,
    timeUntilReset: '10h 17m',
  },
  dailyChecklist: [
    {
      id: '1',
      text: 'Am băut apă suficientă',
      completed: true,
      reward: 1,
    },
    {
      id: '2',
      text: 'Am făcut o pauză de respirație',
      completed: false,
      reward: 1,
    },
    {
      id: '3',
      text: 'M-am deconectat 10 min',
      completed: true,
      reward: 1,
    },
    {
      id: '4',
      text: 'Am scris în jurnal',
      completed: false,
      reward: 1,
    },
    {
      id: '5',
      text: 'Am luat suplimentele',
      completed: false,
      reward: 1,
    },
  ],
  remedies: [
    {
      id: '1',
      title: 'Ceai de Mușețel',
      description:
        'Un ceai calmant perfect pentru relaxare și reducerea stresului. Ideal pentru seara.',
      type: 'tea',
      duration: '5-10 min',
      image:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
    },
    {
      id: '2',
      title: 'Ulei de Lavandă',
      description:
        'Ulei esențial de lavandă pentru aromatherapie și relaxare profundă. Perfect pentru somn.',
      type: 'oil',
      duration: '15-30 min',
      image:
        'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=200&fit=crop',
    },
  ],
  energySummary: {
    message: 'Ai o energie echilibrată.',
    suggestion: 'Mici ajustări pot face diferența.',
  },
};
