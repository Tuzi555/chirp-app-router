import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { clsx } from 'clsx';
import { Toaster } from 'react-hot-toast';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: 'Chirp',
  description: 'Emoji-only social media'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐣</text></svg>"
          />
        </head>
        <body className={clsx(GeistSans.className, 'flex h-screen flex-col justify-center')}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
