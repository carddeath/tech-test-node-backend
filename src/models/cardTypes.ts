export interface Card {
  title: string;
  imageUrl: string;
  url: string;
}

interface Page {
  title: string;
  templateId: string;
}

export interface FullCard {
  id: string;
  title: string;
  sizes: string[];
  basePrice: number;
  pages: Page[];
}

export interface ImageTemplates {
  id: string;
  width: number;
  height: number;
  imageUrl: string;
}

interface CardSize {
  id: string;
  title: string;
}

export interface PricedCardPage {
  title: string;
  width: number;
  height: number;
  imageUrl: string;
}

export interface PricedCard {
  title: string;
  size: string;
  availableSizes: CardSize[];
  imageUrl: string;
  price: string;
  pages: PricedCardPage[];
}
