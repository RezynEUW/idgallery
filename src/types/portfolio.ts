// src/types/portfolio.ts

export type Role = 'Designer' | 'Utvecklare' | 'Annat';

export interface Portfolio {
  id: string;
  name: string;
  classYear: string;
  role: Role;
  imageUrl: string;
  websiteUrl: string;
  description: string;
}