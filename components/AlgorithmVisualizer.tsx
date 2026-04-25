'use client';

import { useEffect, useState } from 'react';
import { useAlgorithmStore } from '@/store/algorithmStore';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { DatasetInput } from '@/components/DatasetInput';
import { Visualization } from '@/components/Visualization';
import { Controls } from '@/components/Controls';
import { Statistics } from '@/components/Statistics';
import { ComplexityDisplay } from '@/components/ComplexityDisplay';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';

export function AlgorithmVisualizer(): React.ReactElement {
  const {
    selectedAlgorithm,
    dataset,
    isRunning,
    currentStep,
    steps,
    statistics,
    isLoading,
    error,
  } = useAlgorithmStore();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Algorithm Visualizer
        </h1>
        <p className="text-slate-400">Step-by-step visualization with real-time statistics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <AlgorithmSelector />
          <DatasetInput />
          {selectedAlgorithm && <ComplexityDisplay />}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!selectedAlgorithm ? (
            <EmptyState />
          ) : error ? (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-200">
              <p className="font-semibold">Invalid Input</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          ) : isLoading ? (
            <LoadingState />
          ) : (
            <>
              <Visualization />
              <Controls />
              <Statistics />
            </>
          )}
        </div>
      </div>
    </div>
  );
}