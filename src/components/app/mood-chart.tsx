'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', mood: 4 },
  { day: 'Tue', mood: 6 },
  { day: 'Wed', mood: 8 },
  { day: 'Thu', mood: 5 },
  { day: 'Fri', mood: 7 },
  { day: 'Sat', mood: 9 },
  { day: 'Sun', mood: 6 },
];

const chartConfig = {
  mood: {
    label: 'Mood',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function MoodChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          domain={[0, 10]}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="mood" fill="var(--color-mood)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
