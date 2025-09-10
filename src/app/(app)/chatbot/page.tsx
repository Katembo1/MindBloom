'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { aiChatbotSupport, AIChatbotSupportInput } from '@/ai/flows/ai-chatbot-support';
import { Bot, Send, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Message = {
  id: number;
  role: 'user' | 'bot';
  text: string;
  suggestions?: {
    copingMechanisms: string[];
    resourceLinks: string[];
  };
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mood, setMood] = useState('neutral');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => `${m.role}: ${m.text}`).join('\n');
    const aiInput: AIChatbotSupportInput = { message: input, mood, history };

    try {
      const result = await aiChatbotSupport(aiInput);
      const botMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: result.response,
        suggestions: {
          copingMechanisms: result.suggestedCopingMechanisms,
          resourceLinks: result.relevantResourceLinks,
        },
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error with AI Chatbot:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Sorry, I am having trouble connecting right now. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const scrollableViewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (scrollableViewport) {
      scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col">
      <Card className="m-4 md:m-8 flex-1 flex flex-col">
        <div className="p-4 border-b">
            <h1 className="font-headline text-2xl font-semibold">AI Chatbot Support</h1>
            <p className="text-muted-foreground">A friendly, non-judgmental space to talk.</p>
        </div>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback><Bot size={20} /></AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <p className="font-semibold">BloomBot</p>
                <p>Hello! I'm here to listen. How are you feeling today? You can set your current mood below.</p>
              </div>
            </div>

            {messages.map((message) => (
              <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'bot' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="font-semibold">{message.role === 'user' ? 'You' : 'BloomBot'}</p>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.suggestions && (
                    <div className="mt-4 space-y-2">
                      {message.suggestions.copingMechanisms.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-1">Coping Ideas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.copingMechanisms.map(s => <Button key={s} size="sm" variant="secondary">{s}</Button>)}
                          </div>
                        </div>
                      )}
                       {message.suggestions.resourceLinks.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-1 mt-2">Resources:</h4>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.resourceLinks.map(s => <Button asChild key={s} size="sm" variant="link" className="p-0 h-auto"><a href={s} target="_blank" rel="noopener noreferrer">{s}</a></Button>)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User size={20} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start gap-4">
                  <Avatar className="w-8 h-8">
                      <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="font-semibold">BloomBot</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></div>
                      </div>
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background rounded-b-lg">
          <div className="flex items-center gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Select value={mood} onValueChange={setMood} disabled={isLoading}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Set Mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">Happy</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="sad">Sad</SelectItem>
                <SelectItem value="anxious">Anxious</SelectItem>
                <SelectItem value="stressed">Stressed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
              <Send />
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
