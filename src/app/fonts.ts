import localFont from 'next/font/local'

export const aeonik = localFont({
  src: [
    {
      path: '../fonts/Aeonik-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Aeonik-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik'
}) 