import { supabase } from './supabase';
import type { Card, CreateCardInput, CardConcept } from './types';

const MAX_TEXT_LENGTH = 10;
const SHORT_ID_LENGTH = 12;

export function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < SHORT_ID_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function validateText(text: string): boolean {
  if (!text || text.length === 0) return false;
  if (text.length > MAX_TEXT_LENGTH) return false;

  const koreanRegex = /^[가-힣]+$/;
  return koreanRegex.test(text);
}

export function validateConcept(concept: string): concept is CardConcept {
  return ['celebration', 'melancholy', 'seduction'].includes(concept);
}

export async function createCard(input: CreateCardInput): Promise<string> {
  if (!validateText(input.text)) {
    throw new Error('Invalid text: must be Korean text up to 10 characters');
  }

  if (!validateConcept(input.concept)) {
    throw new Error('Invalid concept');
  }

  const short_id = generateShortId();

  const { error } = await supabase.from('cards').insert({
    short_id,
    concept: input.concept,
    text: input.text,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to create card: ${error.message}`);
  }

  return short_id;
}

export async function getCard(shortId: string): Promise<Card> {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('short_id', shortId)
    .single();

  if (error) {
    throw new Error(`Card not found: ${error.message}`);
  }

  return data as Card;
}
