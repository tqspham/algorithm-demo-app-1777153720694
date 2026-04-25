'use client';

import { AlgorithmVisualizer } from '@/components/AlgorithmVisualizer';

export default function Home(): React.ReactElement {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <AlgorithmVisualizer />
    </main>
  );
}