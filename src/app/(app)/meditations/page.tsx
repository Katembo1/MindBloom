import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const meditationCategories = [
  {
    title: 'Anxiety Relief',
    description: 'Find calm and peace in moments of stress.',
    imageId: 'meditation-anxiety',
    sessions: [
      { title: '5-Minute Breathing', duration: 5 },
      { title: 'Body Scan for Anxiety', duration: 10 },
      { title: 'Letting Go of Worries', duration: 8 },
    ],
  },
  {
    title: 'Focus',
    description: 'Sharpen your mind and improve concentration.',
    imageId: 'meditation-focus',
    sessions: [
      { title: 'Mindful Focus', duration: 7 },
      { title: 'Concentration Boost', duration: 10 },
      { title: 'Clarity Meditation', duration: 5 },
    ],
  },
  {
    title: 'Sleep',
    description: 'Drift off to a peaceful, restorative sleep.',
    imageId: 'meditation-sleep',
    sessions: [
      { title: 'Deep Sleep Relaxation', duration: 12 },
      { title: 'Winding Down', duration: 8 },
      { title: 'Sleep Story', duration: 15 },
    ],
  },
  {
    title: 'Mindfulness',
    description: 'Practice being present in the moment.',
    imageId: 'meditation-mindfulness',
    sessions: [
      { title: 'Mindful Walking', duration: 10 },
      { title: 'Eating Meditation', duration: 5 },
      { title: 'Observing Thoughts', duration: 7 },
    ],
  },
];

export default function MeditationsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold">
          Guided Meditations
        </h1>
      </div>
      <div className="space-y-8">
        {meditationCategories.map((category) => {
          const image = PlaceHolderImages.find(img => img.id === category.imageId);
          return (
            <Card key={category.title}>
              <CardHeader className="flex flex-col md:flex-row gap-4 md:items-center">
                {image && (
                   <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={200}
                    height={120}
                    className="rounded-lg object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div className="flex-1">
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {category.sessions.map((session) => (
                    <div key={session.title} className="flex items-center justify-between py-3">
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-muted-foreground">{session.duration} min</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
