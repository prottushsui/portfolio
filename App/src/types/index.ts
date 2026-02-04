export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
  onClick: () => void;
  onDoubleClick?: () => void;
  position?: { x: number; y: number };
  onPositionChange?: (pos: { x: number; y: number }) => void;
}

export interface Project {
  id: string;
  title: string;
  category: 'Climate' | 'Tech' | 'Writing';
  problem: string;
  solution: string;
  role: string;
  techStack: string[];
  impact: string;
  github?: string;
  live?: string;
  pdf?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  date: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface WallpaperPreset {
  id: string;
  name: string;
  type: 'shader' | 'gradient' | 'particle';
  config: Record<string, unknown>;
}

export type ParticleType = 'leaves' | 'snow' | 'dust' | 'none';

export interface ParticleConfig {
  type: ParticleType;
  count: number;
  speed: number;
  size: number;
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  highContrast: boolean;
  wallpaper: string;
  particleEffect: ParticleType;
}

export interface SearchResult {
  id: string;
  type: 'app' | 'file' | 'setting';
  title: string;
  icon: string;
  action: () => void;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  action: () => void;
  disabled?: boolean;
  separator?: boolean;
}

export interface BootSequenceConfig {
  showProgressBar: boolean;
  animatedText: boolean;
  duration: number;
  skipEnabled: boolean;
}

export interface WindowAnimationConfig {
  openClose: 'spring' | 'fade' | 'scale' | 'none';
  hoverShake: boolean;
  idleFloat: boolean;
}

export interface MobileConfig {
  menuDrawer: boolean;
  fallbackWallpaper: 'gradient' | 'solid' | 'pattern';
  responsiveShaders: boolean;
}

export interface AccessibilityConfig {
  keyboardNavigation: boolean;
  ariaSupport: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}
