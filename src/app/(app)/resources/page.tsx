import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const resourceCategories = [
  {
    title: 'Understanding Your Mind',
    articles: [
      { title: 'What is Anxiety?', description: 'Learn about the symptoms and types of anxiety.' },
      { title: 'Coping with Daily Stress', description: 'Practical tips for managing everyday pressures.' },
      { title: 'The Importance of Sleep', description: 'How sleep affects your mental and emotional health.' },
    ]
  },
  {
    title: 'Professional Help & Hotlines',
    links: [
      { title: 'National Alliance on Mental Illness (NAMI)', href: 'https://www.nami.org/' },
      { title: 'Substance Abuse and Mental Health Services Administration (SAMHSA)', href: 'https://www.samhsa.gov/' },
      { title: 'MentalHealth.gov', href: 'https://www.mentalhealth.gov/' },
      { title: 'National Suicide Prevention Lifeline', href: '#', description: 'Call 988' },
    ]
  }
];

export default function ResourcesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold">
          Resource Library
        </h1>
      </div>
      <p className="text-muted-foreground">
        Curated articles, tips, and links to professional mental health organizations.
      </p>
      <div className="grid gap-8">
        {resourceCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {category.articles?.map(article => (
                  <div key={article.title} className="py-3">
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">{article.description}</p>
                  </div>
                ))}
                {category.links?.map(link => (
                  <Link href={link.href} key={link.title} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 group">
                    <div>
                      <h3 className="font-semibold group-hover:underline">{link.title}</h3>
                      {link.description && <p className="text-sm text-muted-foreground">{link.description}</p>}
                    </div>
                    {link.href !== '#' && <ArrowUpRight className="text-muted-foreground group-hover:text-primary" />}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
