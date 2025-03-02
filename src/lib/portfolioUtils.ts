// src/lib/portfolioUtils.ts
import { Portfolio } from '@/types/portfolio';

/**
 * Get all available class years from the portfolios
 */
export function getUniqueClassYears(portfolios: Portfolio[]): string[] {
  const classYears = portfolios.map(p => p.classYear);
  return [...new Set(classYears)].sort((a, b) => parseInt(b) - parseInt(a));
}

/**
 * Function to generate a date-based seed for the random feature
 */
export function getDailyRandomSeed(): number {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash);
}

/**
 * Get a random portfolio using a seed value
 */
export function getSeededRandomPortfolio(portfolios: Portfolio[], seed: number): Portfolio {
  const index = seed % portfolios.length;
  return portfolios[index];
}

/**
 * Extract all unique roles from portfolios
 */
export function getUniqueRoles(portfolios: Portfolio[]): string[] {
  const roles = portfolios.map(p => p.role);
  return [...new Set(roles)].sort();
}

/**
 * Format class ID for display
 */
export function formatClassId(classYear: string): string {
  if (!classYear) return '';
  
  if (classYear.toString().startsWith('ID')) {
    return classYear;
  }
  
  return `ID${classYear}`;
}