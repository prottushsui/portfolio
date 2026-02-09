import type { LeaderboardEntry, QuizQuestion, SearchResult } from '@/types';

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

// Desktop Icons Configuration
export const desktopIcons = [
  { id: 'about', title: 'About.exe', icon: '👤' },
  { id: 'projects', title: 'Projects.exe', icon: '📁' },
  { id: 'resume', title: 'Resume.pdf', icon: '📄' },
  { id: 'contact', title: 'Contact.app', icon: '✉️' },
  { id: 'quiz', title: 'Quiz.exe', icon: '❓' },
  { id: 'leaderboard', title: 'Leaderboard.exe', icon: '🏆' },
];

// Search Items
export const searchItems: SearchResult[] = [
  { id: 'about', type: 'app', title: 'About', icon: '👤', action: () => {} },
  { id: 'projects', type: 'app', title: 'Projects', icon: '📁', action: () => {} },
  { id: 'resume', type: 'file', title: 'Resume', icon: '📄', action: () => {} },
  { id: 'contact', type: 'app', title: 'Contact', icon: '✉️', action: () => {} },
  { id: 'quiz', type: 'app', title: 'Quiz', icon: '❓', action: () => {} },
  { id: 'leaderboard', type: 'app', title: 'Leaderboard', icon: '🏆', action: () => {} },
  { id: 'theme', type: 'setting', title: 'Theme Settings', icon: '🎨', action: () => {} },
  { id: 'wallpaper', type: 'setting', title: 'Wallpaper Settings', icon: '🖼️', action: () => {} },
];
