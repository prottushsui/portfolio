import type { SearchResult } from '@/types';

// Desktop Icons Configuration
export const desktopIcons = [
  { id: 'about', title: 'About.exe', icon: '👤' },
  { id: 'projects', title: 'Projects.exe', icon: '📁' },
  { id: 'resume', title: 'Resume.pdf', icon: '📄' },
  { id: 'contact', title: 'Contact.app', icon: '✉️' },
];

// Search Items
export const searchItems: SearchResult[] = [
  { id: 'about', type: 'app', title: 'About', icon: '👤', action: () => {} },
  { id: 'projects', type: 'app', title: 'Projects', icon: '📁', action: () => {} },
  { id: 'resume', type: 'file', title: 'Resume', icon: '📄', action: () => {} },
  { id: 'contact', type: 'app', title: 'Contact', icon: '✉️', action: () => {} },
  { id: 'theme', type: 'setting', title: 'Theme Settings', icon: '🎨', action: () => {} },
  { id: 'wallpaper', type: 'setting', title: 'Wallpaper Settings', icon: '🖼️', action: () => {} },
];
