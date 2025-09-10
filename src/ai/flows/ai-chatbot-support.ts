'use server';

/**
 * @fileOverview This file defines the AI chatbot support flow for the MindBloom app.
 *
 * It includes:
 * - `aiChatbotSupport`: The main function to interact with the chatbot.
 * - `AIChatbotSupportInput`: The input type for the `aiChatbotSupport` function.
 * - `AIChatbotSupportOutput`: The output type for the `aiChatbotSupport` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotSupportInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  mood: z.string().describe('The current mood of the user (e.g., happy, sad, anxious).'),
  history: z.string().describe('The previous conversation history between the user and the chatbot.'),
});
export type AIChatbotSupportInput = z.infer<typeof AIChatbotSupportInputSchema>;

const AIChatbotSupportOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
  suggestedCopingMechanisms: z.array(z.string()).describe('A list of suggested coping mechanisms based on the user mood and history.'),
  relevantResourceLinks: z.array(z.string()).describe('A list of relevant resource links based on the user message.'),
});
export type AIChatbotSupportOutput = z.infer<typeof AIChatbotSupportOutputSchema>;

export async function aiChatbotSupport(input: AIChatbotSupportInput): Promise<AIChatbotSupportOutput> {
  return aiChatbotSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotSupportPrompt',
  input: {
    schema: AIChatbotSupportInputSchema,
  },
  output: {
    schema: AIChatbotSupportOutputSchema,
  },
  prompt: `You are a friendly and non-judgmental AI chatbot designed to provide empathetic support and suggest coping mechanisms to users based on their mood and conversation history.

  Your goal is to assist users with everyday stress, anxiety, and mild depression by providing personalized assistance and guiding them to relevant resources within the MindBloom app.

  Do not act as a therapist, and do not provide medical advice.

  Current Mood: {{{mood}}}
  Conversation History: {{{history}}}
  User Message: {{{message}}}

  Based on the user's current mood, conversation history, and message, generate a helpful and supportive response. Also, suggest 2-3 relevant coping mechanisms from the following list:

  - Breathing exercises
  - Mindfulness meditation
  - Journaling
  - 5-minute doodle challenge
  - Listening to calming music

  Finally, provide 1-2 relevant resource links from the following list:

  - https://www.mentalhealth.gov/
  - https://www.nami.org/
  - https://www.samhsa.gov/

  Make sure the response, suggested coping mechanisms, and resource links are appropriate for the user's current situation.

  Remember to maintain a warm, supportive, and compassionate tone throughout the conversation. Avoid clinical or overly technical jargon.
  `,
});

const aiChatbotSupportFlow = ai.defineFlow(
  {
    name: 'aiChatbotSupportFlow',
    inputSchema: AIChatbotSupportInputSchema,
    outputSchema: AIChatbotSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
