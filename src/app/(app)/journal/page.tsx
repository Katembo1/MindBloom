import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const journalEntries = [
  {
    date: 'Yesterday',
    title: 'A challenging day',
    excerpt: 'Today was tough. I felt overwhelmed with my assignments, but I managed to get through it by taking a few breaks and...'
  },
  {
    date: '3 days ago',
    title: 'Feeling grateful',
    excerpt: 'I started my day by listing three things I\'m grateful for. It really shifted my perspective and helped me feel more positive...'
  },
  {
    date: 'Last week',
    title: 'Small victories',
    excerpt: 'I finally finished the project I was working on. It feels good to accomplish something I put so much effort into...'
  }
];

export default function JournalPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-semibold">
          Your Private Journal
        </h1>
        <Button>
          <PlusCircle className="mr-2" />
          New Entry
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Journal Prompts</CardTitle>
          <CardDescription>Need inspiration? Here are some ideas to get you started.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-wrap gap-2'>
            <Button variant="secondary" size="sm">What brought you joy today?</Button>
            <Button variant="secondary" size="sm">Describe a recent challenge.</Button>
            <Button variant="secondary" size="sm">What are you grateful for?</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map((entry) => (
          <Card key={entry.title}>
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <CardDescription>{entry.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{entry.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
