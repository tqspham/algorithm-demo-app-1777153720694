'use client';

import { useState } from 'react';
import { useAlgorithmStore } from '@/store/algorithmStore';
import { getAlgorithmById } from '@/constants/algorithms';

export function DatasetInput(): React.ReactElement {
  const { selectedAlgorithm, setDataset, setError } = useAlgorithmStore();
  const [input, setInput] = useState<string>('');

  const algorithm = selectedAlgorithm ? getAlgorithmById(selectedAlgorithm) : null;

  const handleGenerateRandom = (): void => {
    const size = 20;
    const data = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setDataset(data);
    setInput(data.join(', '));
    setError(null);
  };

  const handleInputChange = (value: string): void => {
    setInput(value);
  };

  const handleApply = (): void => {
    if (!input.trim()) {
      setError('Dataset cannot be empty');
      return;
    }

    try {
      const values = input
        .split(',')
        .map((v) => {
          const trimmed = v.trim();
          if (!/^-?\d+$/.test(trimmed)) {
            throw new Error(`Invalid number: "${trimmed}"`);
          }
          return parseInt(trimmed, 10);
        })
        .filter((v) => !isNaN(v));

      if (values.length === 0) {
        setError('Please enter at least one valid number');
        return;
      }

      if (values.length > 100) {
        setError('Maximum 100 elements allowed');
        return;
      }

      setDataset(values);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid input format';
      setError(message);
    }
  };

  if (!selectedAlgorithm) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 opacity-50 pointer-events-none">
        <p className="text-slate-400 text-sm">Select an algorithm first</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
      <div>
        <label
          htmlFor="dataset-input"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Enter Dataset
        </label>
        <textarea
          id="dataset-input"
          aria-label="Enter comma-separated numbers for the dataset"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
          className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
        />
        <p className="text-xs text-slate-400 mt-1">
          Enter comma-separated integers. Max 100 elements.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Apply
        </button>
        <button
          onClick={handleGenerateRandom}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Generate Random
        </button>
      </div>
    </div>
  );
}