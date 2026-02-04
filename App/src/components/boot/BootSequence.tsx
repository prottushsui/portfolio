import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BootSequenceProps {
  onComplete: () => void;
  duration?: number;
  showProgressBar?: boolean;
  animatedText?: boolean;
  skipEnabled?: boolean;
}

const bootMessages = [
  'Initializing kernel...',
  'Loading modules...',
  'Mounting file systems...',
  'Starting system services...',
  'Loading user profile...',
  'Preparing desktop environment...',
  'Welcome to Portfolio OS',
];

export const BootSequence: React.FC<BootSequenceProps> = ({
  onComplete,
  duration = 3000,
  showProgressBar = true,
  animatedText = true,
  skipEnabled = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 50));
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  useEffect(() => {
    if (!animatedText) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(() => {
        const nextIndex = Math.floor((progress / 100) * bootMessages.length);
        return Math.min(nextIndex, bootMessages.length - 1);
      });
    }, 200);

    return () => clearInterval(messageInterval);
  }, [progress, animatedText]);

  const skipBoot = () => {
    setProgress(100);
    setIsComplete(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-[9999]"
        >
          <div className="text-center space-y-8 max-w-md px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/50 rounded-2xl flex items-center justify-center text-4xl shadow-2xl">
                💻
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-white mb-2">
                Md. Mottakin Bin Arif
              </h1>
              <p className="text-slate-400">(Prottush)</p>
            </motion.div>

            {/* Animated Text */}
            {animatedText && (
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-6"
              >
                <p className="text-slate-300 text-sm boot-text-animate">
                  {bootMessages[currentMessageIndex]}
                </p>
              </motion.div>
            )}

            {/* Progress Bar */}
            {showProgressBar && (
              <div className="w-72 mx-auto space-y-2">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/70"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-slate-400 text-sm">{Math.round(progress)}%</p>
              </div>
            )}

            {/* Skip Button */}
            {skipEnabled && progress < 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  variant="ghost"
                  onClick={skipBoot}
                  className="text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  Skip
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
