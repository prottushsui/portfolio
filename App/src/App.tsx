import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { User, Folder, FileText, Mail, Trophy, HelpCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hooks
import { useTheme, useWindowManager, useSearch, useKeyboardNavigation } from '@/hooks';

// Components
import { WallpaperManager } from '@/components/wallpaper';
import { WindowFrame } from '@/components/windows';
import { DesktopGrid } from '@/components/desktop';
import { Taskbar } from '@/components/taskbar';
import { ContextMenu } from '@/components/context-menu';
import { BootSequence } from '@/components/boot';
import { SearchBar } from '@/components/search';
import { MobileMenu } from '@/components/mobile';
import { Quiz } from '@/components/quiz';
import { Leaderboard } from '@/components/leaderboard';

// Content Components
import { AboutContent } from '@/content/AboutContent';
import { ProjectsContent } from '@/content/ProjectsContent';
import { ResumeContent } from '@/content/ResumeContent';
import { ContactContent } from '@/content/ContactContent';

// Types
import type { ContextMenuItem } from '@/types';
import { desktopIcons, leaderboardData, quizQuestions, searchItems } from '@/data/appData';

function App() {
  // State
  const [isBooting, setIsBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ isOpen: boolean; position: { x: number; y: number } }>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  // Hooks
  const { theme, isDark, toggleMode, toggleHighContrast, setParticleEffect } = useTheme();
  const { 
    windows, 
    activeWindowId, 
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();
  const { isOpen: searchOpen, openSearch, closeSearch, executeSearch } = useSearch({ items: searchItems });

  // Check mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update clock
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useKeyboardNavigation({
    onWindowSwitch: (direction) => {
      const openWindows = windows.filter(w => w.isOpen);
      if (openWindows.length === 0) return;
      
      const currentIndex = openWindows.findIndex(w => w.id === activeWindowId);
      const newIndex = direction === 'next' 
        ? (currentIndex + 1) % openWindows.length
        : (currentIndex - 1 + openWindows.length) % openWindows.length;
      
      focusWindow(openWindows[newIndex].id);
    },
    onWindowClose: () => {
      if (activeWindowId) closeWindow(activeWindowId);
    },
    onWindowMinimize: () => {
      if (activeWindowId) minimizeWindow(activeWindowId);
    },
    onWindowMaximize: () => {
      if (activeWindowId) maximizeWindow(activeWindowId);
    },
    onSearchOpen: openSearch,
    onThemeToggle: toggleMode,
    onEscape: () => {
      closeSearch();
      setContextMenu(prev => ({ ...prev, isOpen: false }));
    },
  });

  // Handle desktop right-click
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
    });
  }, []);

  // Context menu items
  const contextMenuItems: ContextMenuItem[] = useMemo(() => [
    { id: 'open', label: 'Open', icon: 'open', action: () => {} },
    { id: 'close', label: 'Close All', icon: 'close', action: () => {
      windows.filter(w => w.isOpen).forEach(w => closeWindow(w.id));
    }},
    { id: 'separator1', label: '', separator: true, action: () => {} },
    { id: 'theme', label: 'Theme', icon: 'theme', action: () => toggleMode() },
    { id: 'light', label: 'Light Mode', icon: 'light', action: () => {} },
    { id: 'dark', label: 'Dark Mode', icon: 'dark', action: () => {} },
    { id: 'separator2', label: '', separator: true, action: () => {} },
    { id: 'leaves', label: 'Leaves Effect', icon: 'leaves', action: () => setParticleEffect('leaves') },
    { id: 'snow', label: 'Snow Effect', icon: 'snow', action: () => setParticleEffect('snow') },
    { id: 'none', label: 'No Effect', icon: 'none', action: () => setParticleEffect('none') },
  ], [windows, closeWindow, toggleMode, setParticleEffect]);

  // Handle context menu action
  const handleContextMenuAction = useCallback((actionId: string) => {
    switch (actionId) {
      case 'light':
        // setTheme({ mode: 'light' });
        break;
      case 'dark':
        // setTheme({ mode: 'dark' });
        break;
    }
  }, []);

  // Handle icon click
  const handleIconClick = useCallback((id: string) => {
    const iconConfig = desktopIcons.find(i => i.id === id);
    if (iconConfig) {
      openWindow(id, iconConfig.title, iconConfig.icon);
    }
  }, [openWindow]);

  // Get window content
  const getWindowContent = useCallback((windowId: string) => {
    switch (windowId) {
      case 'about':
        return <AboutContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'resume':
        return <ResumeContent />;
      case 'contact':
        return <ContactContent />;
      case 'quiz':
        return (
          <Quiz 
            questions={quizQuestions} 
            onComplete={(score, total) => {
              console.log(`Quiz completed: ${score}/${total}`);
            }}
            onClose={() => closeWindow('quiz')}
          />
        );
      case 'leaderboard':
        return <Leaderboard entries={leaderboardData} />;
      default:
        return <div>Window content not found</div>;
    }
  }, [closeWindow]);

  // Mobile menu items
  const mobileMenuItems = useMemo(() => [
    { id: 'about', title: 'About', icon: <User className="h-5 w-5" />, onClick: () => handleIconClick('about') },
    { id: 'projects', title: 'Projects', icon: <Folder className="h-5 w-5" />, onClick: () => handleIconClick('projects') },
    { id: 'resume', title: 'Resume', icon: <FileText className="h-5 w-5" />, onClick: () => handleIconClick('resume') },
    { id: 'contact', title: 'Contact', icon: <Mail className="h-5 w-5" />, onClick: () => handleIconClick('contact') },
    { id: 'quiz', title: 'Quiz', icon: <HelpCircle className="h-5 w-5" />, onClick: () => handleIconClick('quiz') },
    { id: 'leaderboard', title: 'Leaderboard', icon: <Trophy className="h-5 w-5" />, onClick: () => handleIconClick('leaderboard') },
  ], [handleIconClick]);

  // Handle boot complete
  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  // Boot sequence
  if (isBooting) {
    return (
      <BootSequence 
        onComplete={handleBootComplete}
        duration={3000}
        showProgressBar={true}
        animatedText={true}
        skipEnabled={true}
      />
    );
  }

  // Mobile view
  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-hidden">
        {/* Wallpaper */}
        <WallpaperManager
          type="gradient"
          preset="subtle"
          isDark={isDark}
          isMobile={true}
        />

        {/* Mobile Header */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 z-50">
          <h1 className="text-lg font-bold">Portfolio OS</h1>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Content */}
        <div className="absolute top-14 left-0 right-0 bottom-0 overflow-auto p-4">
          {windows.filter(w => w.isOpen && !w.isMinimized).map(window => (
            <div key={window.id} className="mb-4">
              {getWindowContent(window.id)}
            </div>
          ))}
          
          {windows.filter(w => w.isOpen && !w.isMinimized).length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">💻</div>
              <h2 className="text-xl font-bold mb-2">Welcome to Portfolio OS</h2>
              <p className="text-muted-foreground">Open the menu to explore</p>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          items={mobileMenuItems}
          userName="Prottush"
          userRole="Student & Climate Advocate"
        />

        {/* Search Bar */}
        <SearchBar
          isOpen={searchOpen}
          onClose={closeSearch}
          onSelect={(result) => {
            executeSearch(result);
            handleIconClick(result.id);
          }}
          items={searchItems}
        />
      </div>
    );
  }

  // Desktop view
  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      onContextMenu={handleContextMenu}
    >
      {/* Wallpaper */}
      <WallpaperManager
        type="shader"
        preset={theme.wallpaper as 'water' | 'aurora' | 'fire' | 'cosmic' | 'minimal'}
        isDark={isDark}
        isMobile={false}
      />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 z-[100]">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>🕒 {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="text-xs font-semibold">Portfolio OS</div>
        <div className="w-20" />
      </div>

      {/* Desktop Icons */}
      <DesktopGrid
        icons={desktopIcons.map(icon => ({
          ...icon,
          onClick: () => handleIconClick(icon.id),
          onDoubleClick: () => handleIconClick(icon.id),
        }))}
        hoverEffect="tilt"
      />

      {/* Windows */}
      <div className="absolute inset-0 pointer-events-none pt-8 pb-14">
        <AnimatePresence>
          {windows.filter(w => w.isOpen).map(window => (
            <div key={window.id} className="pointer-events-auto">
              <WindowFrame
                id={window.id}
                title={window.title}
                icon={window.icon}
                isMaximized={window.isMaximized}
                isMinimized={window.isMinimized}
                zIndex={window.zIndex}
                initialPosition={window.position}
                initialSize={window.size}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                onFocus={() => focusWindow(window.id)}
                onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
                onSizeChange={(size) => updateWindowSize(window.id, size)}
                animationType="spring"
                idleFloat={false}
              >
                {getWindowContent(window.id)}
              </WindowFrame>
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        theme={theme}
        onStartClick={() => {}}
        onWindowClick={focusWindow}
        onSearchClick={openSearch}
        onThemeToggle={toggleMode}
        onHighContrastToggle={toggleHighContrast}
        currentTime={currentTime}
      />

      {/* Context Menu */}
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        items={contextMenuItems}
        onClose={() => setContextMenu(prev => ({ ...prev, isOpen: false }))}
        onAction={handleContextMenuAction}
      />

      {/* Search Bar */}
      <SearchBar
        isOpen={searchOpen}
        onClose={closeSearch}
        onSelect={(result) => {
          executeSearch(result);
          handleIconClick(result.id);
        }}
        items={searchItems}
      />
    </div>
  );
}

export default App;
