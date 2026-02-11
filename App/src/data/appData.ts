import type { LeaderboardEntry, QuizQuestion, SearchResult } from '@/types';

type AppEntry = {
  id: string;
  name: string;
  desktopTitle: string;
  icon: string;
  searchType: SearchResult['type'];
};

// Quiz Questions
export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the main goal of the Cambrian Climate Club?',
    options: [
      'To organize social events',
      'To promote climate awareness and action',
      'To raise funds for the school',
      'To compete in sports',
    ],
    correctAnswer: 1,
    category: 'Climate',
  },
  {
    id: '2',
    question: 'Which technology is NOT used in the Youth Leadership Portal?',
    options: [
      'Next.js',
      'TypeScript',
      'MongoDB',
      'Prisma',
    ],
    correctAnswer: 2,
    category: 'Tech',
  },
  {
    id: '3',
    question: 'What role does Prottush hold in the Climate Club?',
    options: [
      'President',
      'Secretary (Publicity)',
      'Treasurer',
      'Member',
    ],
    correctAnswer: 1,
    category: 'Leadership',
  },
  {
    id: '4',
    question: 'How many students were engaged through the Climate Action Platform?',
    options: [
      '100+',
      '300+',
      '500+',
      '1000+',
    ],
    correctAnswer: 2,
    category: 'Impact',
  },
  {
    id: '5',
    question: 'What is Climate Chronicles?',
    options: [
      'A weather app',
      'A publication platform',
      'A video game',
      'A social media site',
    ],
    correctAnswer: 1,
    category: 'Media',
  },
];

// Leaderboard Data
export const leaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'Climate Champion', score: 500, date: '2025-01-15', avatar: '🌱' },
  { id: '2', name: 'Eco Warrior', score: 450, date: '2025-01-14', avatar: '🌍' },
  { id: '3', name: 'Green Leader', score: 400, date: '2025-01-13', avatar: '🌿' },
  { id: '4', name: 'Nature Lover', score: 350, date: '2025-01-12', avatar: '🌳' },
  { id: '5', name: 'Earth Keeper', score: 300, date: '2025-01-11', avatar: '🌊' },
];

const appEntries: AppEntry[] = [
  { id: 'about', name: 'About', desktopTitle: 'About.exe', icon: '👤', searchType: 'app' },
  { id: 'projects', name: 'Projects', desktopTitle: 'Projects.exe', icon: '📁', searchType: 'app' },
  { id: 'resume', name: 'Resume', desktopTitle: 'Resume.pdf', icon: '📄', searchType: 'file' },
  { id: 'contact', name: 'Contact', desktopTitle: 'Contact.app', icon: '✉️', searchType: 'app' },
  { id: 'quiz', name: 'Quiz', desktopTitle: 'Quiz.exe', icon: '❓', searchType: 'app' },
  { id: 'leaderboard', name: 'Leaderboard', desktopTitle: 'Leaderboard.exe', icon: '🏆', searchType: 'app' },
];

// Desktop Icons Configuration
export const desktopIcons = appEntries.map((entry) => ({
  id: entry.id,
  title: entry.desktopTitle,
  icon: entry.icon,
}));

// Search Items
export const searchItems: SearchResult[] = [
  ...appEntries.map((entry) => ({
    id: entry.id,
    type: entry.searchType,
    title: entry.name,
    icon: entry.icon,
    action: () => {},
  })),
  { id: 'theme', type: 'setting', title: 'Theme Settings', icon: '🎨', action: () => {} },
  { id: 'wallpaper', type: 'setting', title: 'Wallpaper Settings', icon: '🖼️', action: () => {} },
];
