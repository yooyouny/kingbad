export type CardConcept = 'celebration' | 'melancholy' | 'seduction';

export interface Card {
  id: number;
  short_id: string;
  concept: CardConcept;
  text: string;
  created_at: string;
  used?: boolean;
}

export interface CreateCardInput {
  concept: CardConcept;
  text: string;
}
