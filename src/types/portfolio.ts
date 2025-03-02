// src/types/portfolio.ts
export interface Portfolio {
    id: string;
    name: string;
    classYear: string;
    role: 'Designer' | 'Developer';
    imageUrl: string;
    websiteUrl: string;
    description: string;
  }