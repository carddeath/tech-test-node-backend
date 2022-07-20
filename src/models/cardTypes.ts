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
