import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Paintbrush, Wind } from 'lucide-react';
import BreathingExercise from '@/components/app/breathing-exercise';

export default function CopingToolsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold">
          Quick Coping Tools
        </h1>
      </div>
      <p className="text-muted-foreground">
        Actionable exercises for moments of high stress or anxiety.
      </p>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wind className="text-primary" />
              <CardTitle>Guided Breathing</CardTitle>
            </div>
            <CardDescription>
              Follow the animation to regulate your breath and calm your nervous system. Inhale as it expands, exhale as it contracts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BreathingExercise />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Paintbrush className="text-primary" />
                <CardTitle>5-Minute Doodle</CardTitle>
              </div>
              <CardDescription>
                Grab a pen and paper. Let your mind wander and draw whatever comes to you for 5 minutes. No rules, no judgment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Timer</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Music className="text-primary" />
                <CardTitle>Calming Music</CardTitle>
              </div>
              <CardDescription>
                Listen to some soothing sounds to help you relax.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Play Ambient Music</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
