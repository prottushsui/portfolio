import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Moon, 
  Sun, 
  Monitor,
  Contrast,
  Wifi,
  Battery,
  Volume2,
  LayoutGrid,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ThemeConfig, WindowState } from '@/types';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  theme: ThemeConfig;
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  onSearchClick: () => void;
  onThemeToggle: () => void;
  onHighContrastToggle: () => void;
  currentTime: Date;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  theme,
  onStartClick,
  onWindowClick,
  onSearchClick,
  onThemeToggle,
  onHighContrastToggle,
  currentTime,
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);

  const pinnedWindows = windows.filter(w => w.isOpen);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-card/90 backdrop-blur-lg border-t border-border z-[1000] flex items-center px-2 gap-1">
      {/* Start Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-10 w-10 rounded-lg transition-all duration-200',
          showStartMenu && 'bg-primary text-primary-foreground'
        )}
        onClick={() => {
          setShowStartMenu(!showStartMenu);
          onStartClick();
        }}
        aria-label="Start"
      >
        <LayoutGrid className="h-5 w-5" />
      </Button>

      {/* Search Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-lg"
        onClick={onSearchClick}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Pinned Windows */}
      <div className="flex items-center gap-1 px-2">
        {pinnedWindows.map(window => (
          <motion.button
            key={window.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onWindowClick(window.id)}
            className={cn(
              'h-10 px-3 rounded-lg flex items-center gap-2 transition-all duration-200',
              activeWindowId === window.id
                ? 'bg-primary/20 border-b-2 border-primary'
                : 'hover:bg-muted'
            )}
            aria-label={window.title}
            aria-pressed={activeWindowId === window.id}
          >
            <span className="text-lg">{window.icon}</span>
            <span className="text-sm font-medium hidden sm:inline max-w-[100px] truncate">
              {window.title}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System Tray */}
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-lg"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme.mode === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : theme.mode === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
        </Button>

        {/* High Contrast Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 rounded-lg',
            theme.highContrast && 'bg-primary/20'
          )}
          onClick={onHighContrastToggle}
          aria-label="Toggle high contrast"
          aria-pressed={theme.highContrast}
        >
          <Contrast className="h-5 w-5" />
        </Button>

        {/* System Icons */}
        <div className="hidden md:flex items-center gap-2 px-2">
          <Wifi className="h-4 w-4 text-muted-foreground" />
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Battery className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Clock */}
        <div className="flex flex-col items-end px-3 py-1 rounded-lg hover:bg-muted cursor-default">
          <span className="text-sm font-medium">{formatTime(currentTime)}</span>
          <span className="text-xs text-muted-foreground">{formatDate(currentTime)}</span>
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-2 w-80 bg-card/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl p-4 z-[1001]"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-medium">Prottush</p>
                  <p className="text-xs text-muted-foreground">Student & Climate Advocate</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</p>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setShowStartMenu(false);
                    onSearchClick();
                  }}
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setShowStartMenu(false);
                    onThemeToggle();
                  }}
                >
                  {theme.mode === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>Theme: {theme.mode}</span>
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setShowStartMenu(false);
                    onHighContrastToggle();
                  }}
                >
                  <Contrast className="h-4 w-4" />
                  <span>High Contrast: {theme.highContrast ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
