// src/app/api/random-feature/route.ts
import { NextResponse } from 'next/server';
import portfolios from '@/data/portfolios.json';
import { getDailyRandomSeed, getSeededRandomPortfolio } from '@/lib/portfolioUtils';
import { Portfolio } from '@/types/portfolio';

export async function GET() {
  try {
    // Get a seed based on today's date
    const seed = getDailyRandomSeed();
    
    // Get a portfolio based on the seed
    const featuredPortfolio = getSeededRandomPortfolio(portfolios as Portfolio[], seed);
    
    return NextResponse.json({ 
      portfolio: featuredPortfolio,
      success: true
    });
  } catch (error) {
    console.error('Error fetching featured portfolio:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch featured portfolio', success: false },
      { status: 500 }
    );
  }
}