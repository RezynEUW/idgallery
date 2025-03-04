// src/app/fonts.ts
import localFont from 'next/font/local';

export const fixelDisplay = localFont({
  src: [
    {
      path: '../public/fonts/FixelAll/FixelDisplay/FixelDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FixelAll/FixelDisplay/FixelDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/FixelAll/FixelDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-fixel-display'
});

export const fixelText = localFont({
  src: [
    {
      path: '../public/fonts/FixelAll/FixelText-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FixelAll/FixelText-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/FixelAll/FixelText-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-fixel-text'
});

export const fixelVariable = localFont({
  src: '../public/fonts/FixelAll/FixelVariable.woff2',
  variable: '--font-fixel-variable'
});