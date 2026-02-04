import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
        onComplete(score + (index === questions[currentQuestion].correctAnswer ? 1 : 0), questions.length);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground">You scored {score} out of {questions.length}</p>
        </motion.div>

        <div className="w-full max-w-xs mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Score</span>
            <span className="font-bold">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRestart} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="flex flex-col h-full p-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-muted-foreground">{question.category}</span>
        </div>
        <Progress 
          value={((currentQuestion + 1) / questions.length) * 100} 
          className="h-2" 
        />
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex-1"
      >
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: answered ? 1 : 1.02 }}
              whileTap={{ scale: answered ? 1 : 0.98 }}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={cn(
                'w-full p-4 rounded-lg border-2 text-left transition-all',
                answered && index === question.correctAnswer
                  ? 'border-green-500 bg-green-500/10'
                  : answered && index === selectedAnswer && index !== question.correctAnswer
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-border hover:border-primary/50 hover:bg-muted'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {answered && index === question.correctAnswer && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {answered && index === selectedAnswer && index !== question.correctAnswer && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
