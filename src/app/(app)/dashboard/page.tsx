import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Frown, Laugh, Meh, Smile } from 'lucide-react';
import MoodChart from '@/components/app/mood-chart';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold">
          Welcome back, Bloomie!
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>
              Log your mood to track your emotional wellness over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between text-muted-foreground px-2">
              <Frown className="size-8" />
              <Meh className="size-8" />
              <Smile className="size-8" />
              <Laugh className="size-8" />
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
            <Button className="w-full">Log Mood</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Jump right into an activity.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" asChild>
              <Link href="/meditations">Start a 5-min meditation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/journal">Write a journal entry</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/coping-tools">Try a breathing exercise</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Mood Over Time</CardTitle>
          <CardDescription>
            Visualize your mood patterns from the last week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoodChart />
        </CardContent>
      </Card>
    </main>
  );
}
