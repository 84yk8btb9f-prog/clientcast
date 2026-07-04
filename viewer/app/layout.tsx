import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const title = 'Clientcast — client updates drafted from your git commits';
const description =
  'Clientcast reads your git commits, drafts the client update with AI, and emails it with a review link. Replies get classified — approval, feedback, or scope creep — with hours and dollars attached.';

export const metadata: Metadata = {
  metadataBase: new URL('https://clientcast-landing.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://clientcast-landing.vercel.app',
    siteName: 'Clientcast',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-[#0a0a0a] text-[#ededed] font-[family-name:var(--font-geist-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
