import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Algorithm Visualizer',
  description: 'Step-by-step visualization of algorithms with real-time statistics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  );
}