import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  date: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  currentUserId,
}) => {
  const sortedEntries = [...entries].sort((a, b) => b.score - a.score);
  const topThree = sortedEntries.slice(0, 3);
  const rest = sortedEntries.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank + 1}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 0:
        return 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-300';
      case 1:
        return 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30 border-gray-300';
      case 2:
        return 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 border-amber-300';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="h-full overflow-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Leaderboard</h2>

      {/* Top 3 */}
      <div className="flex justify-center gap-4 mb-8">
        {topThree.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex flex-col items-center p-4 rounded-xl border-2 min-w-[100px]',
              getRankStyle(index),
              entry.id === currentUserId && 'ring-2 ring-primary'
            )}
          >
            <div className="mb-2">{getRankIcon(index)}</div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl mb-2">
              {entry.avatar || '👤'}
            </div>
            <p className="font-medium text-sm text-center truncate max-w-[80px]">{entry.name}</p>
            <p className="text-2xl font-bold text-primary">{entry.score}</p>
          </motion.div>
        ))}
      </div>

      {/* Rest of the list */}
      <div className="space-y-2">
        {rest.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index + 3) * 0.05 }}
            className={cn(
              'flex items-center gap-4 p-3 rounded-lg border',
              'bg-card hover:bg-muted/50 transition-colors',
              entry.id === currentUserId && 'ring-2 ring-primary bg-primary/5'
            )}
          >
            <div className="w-8 flex justify-center">
              {getRankIcon(index + 3)}
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
              {entry.avatar || '👤'}
            </div>
            <div className="flex-1">
              <p className="font-medium">{entry.name}</p>
              <p className="text-xs text-muted-foreground">{entry.date}</p>
            </div>
            <div className="text-xl font-bold text-primary">{entry.score}</div>
          </motion.div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>No entries yet. Be the first!</p>
        </div>
      )}
    </div>
  );
};
