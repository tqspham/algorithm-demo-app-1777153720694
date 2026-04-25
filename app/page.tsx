'use client';

import { AlgorithmVisualizer } from '@/components/AlgorithmVisualizer';

export default function Home(): React.ReactElement {
  return (
    <main className="min-h-screen bg-white p-6 md:p-8">
      <AlgorithmVisualizer />
    </main>
  );
}
