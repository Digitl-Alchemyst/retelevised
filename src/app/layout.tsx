/* eslint-disable react/function-component-definition */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'ReTelevised | Live Stream Agregation Software',
  description: '',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='en'>
      
      <body className={`bg-slate-400/70 scrollbar-hide ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
