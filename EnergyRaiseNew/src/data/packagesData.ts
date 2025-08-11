export interface PremiumPackage {
  id: string;
  title: string;
  description: string;
  icon: string;
  isPopular?: boolean;
  isNew?: boolean;
  duration: {
    value: number;
    unit: string;
  };
  stats: {
    exercises: number;
    guides: number;
    techniques: number;
  };
  type: 'Reflection' | 'Transformation' | 'Meditation' | 'Journaling';
  backgroundColor?: string;
}

export const premiumPackages: PremiumPackage[] = [
  {
    id: '1',
    title: 'Busola Interioară',
    description:
      'Ghidul tău pentru navigarea prin emoții și găsirea direcției în viață.',
    icon: '🧭',
    isPopular: true,
    duration: {
      value: 6,
      unit: 'săptămâni',
    },
    stats: {
      exercises: 21,
      guides: 3,
      techniques: 8,
    },
    type: 'Reflection',
  },
  {
    id: '2',
    title: '30 de Zile de Sine',
    description: 'O călătorie intensivă de reconectare cu esența ta autentică.',
    icon: '🌱',
    isPopular: true,
    duration: {
      value: 30,
      unit: 'de zile',
    },
    stats: {
      exercises: 30,
      guides: 6,
      techniques: 20,
    },
    type: 'Transformation',
  },
  {
    id: '3',
    title: 'Spațiul Tău Sacru',
    description:
      'Transformă spațiul fizic și mental într-un sanctuar personal de pace.',
    icon: '🏛️',
    duration: {
      value: 4,
      unit: 'săptămâni',
    },
    stats: {
      exercises: 16,
      guides: 4,
      techniques: 10,
    },
    type: 'Transformation',
    backgroundColor: '#4A2D7D',
  },
  {
    id: '4',
    title: 'Harta Liniștii Personale',
    description:
      'Cartografiază-ți drumul către pacea interioară și echilibrul emoțional.',
    icon: '🗺️',
    duration: {
      value: 8,
      unit: 'săptămâni',
    },
    stats: {
      exercises: 32,
      guides: 5,
      techniques: 15,
    },
    type: 'Reflection',
  },
  {
    id: '5',
    title: 'Dimineți Conștiente',
    description:
      'Transformă primele ore ale zilei într-o fundație solidă pentru bunăstare.',
    icon: '🌅',
    isNew: true,
    duration: {
      value: 21,
      unit: 'de zile',
    },
    stats: {
      exercises: 21,
      guides: 3,
      techniques: 9,
    },
    type: 'Meditation',
  },
  {
    id: '6',
    title: 'Ritualuri pentru Claritate',
    description:
      'Creează obiceiuri zilnice care îți aduc liniște mentală și focus.',
    icon: '🕯️',
    duration: {
      value: 4,
      unit: 'săptămâni',
    },
    stats: {
      exercises: 18,
      guides: 4,
      techniques: 12,
    },
    type: 'Meditation',
  },
  {
    id: '7',
    title: 'Scris pentru Suflet',
    description:
      'Folosește puterea scrisului pentru vindecarea și transformarea emoțională.',
    icon: '✍️',
    duration: {
      value: 6,
      unit: 'săptămâni',
    },
    stats: {
      exercises: 42,
      guides: 4,
      techniques: 13,
    },
    type: 'Journaling',
  },
  {
    id: '8',
    title: 'Ecouri din Interior',
    description:
      'Descoperă vocea interioară autentică prin exerciții transformatoare.',
    icon: '🫧',
    duration: {
      value: 6,
      unit: 'săptămâni',
    },
    stats: {
      exercises: 24,
      guides: 4,
      techniques: 10,
    },
    type: 'Reflection',
  },
];

export const packageDetails = {
  'Busola Interioară': {
    description:
      'Un program complet de auto-descoperire care te învață să îți înțelegi valorile profunde, să identifici direcția ta autentică și să navighezi prin provocările emoționale cu claritate și încredere.',
    includes: [
      'Ghid complet de auto-evaluare și descoperire',
      '21 de exerciții de reflecție profundă',
      'Tehnici de identificare a valorilor personale',
      'Planificator pentru obiective autentice',
      'Meditații ghidate pentru claritate',
      'Comunitate privată de suport',
    ],
    preview: {
      title: 'Exercițiul "Valorile Tale Fundamentale"',
      description:
        'Descoperă care sunt valorile care te definesc cu adevărat prin acest exercițiu introspectiv care îți va clarifica prioritățile și deciziile viitoare.',
    },
  },
};
