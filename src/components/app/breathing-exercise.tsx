'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import './breathing-exercise.css';

export default function BreathingExercise() {
  const [isBreathing, setIsBreathing] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-8 rounded-lg bg-muted/50 p-8 aspect-video">
      <div className={cn('breathing-circle-container', isBreathing && 'is-breathing')}>
        <div className="breathing-circle"></div>
        <div className="breathing-text"></div>
      </div>
      <Button onClick={() => setIsBreathing(!isBreathing)} size="lg" className="w-40">
        {isBreathing ? 'Stop' : 'Start'}
      </Button>
    </div>
  );
}
