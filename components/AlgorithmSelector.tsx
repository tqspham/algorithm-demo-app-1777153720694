'use client';

import { useAlgorithmStore } from '@/store/algorithmStore';
import { ALGORITHMS } from '@/constants/algorithms';

export function AlgorithmSelector(): React.ReactElement {
  const { selectedAlgorithm, setSelectedAlgorithm, reset } = useAlgorithmStore();

  const handleChange = (algorithmId: string): void => {
    setSelectedAlgorithm(algorithmId);
    reset();
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <label
        htmlFor="algorithm-select"
        className="block text-sm font-semibold text-slate-300 mb-3"
      >
        Select Algorithm
      </label>
      <select
        id="algorithm-select"
        aria-label="Select an algorithm to visualize"
        value={selectedAlgorithm || ''}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Choose an algorithm...</option>
        {ALGORITHMS.map((algo) => (
          <option key={algo.id} value={algo.id}>
            {algo.category}: {algo.name}
          </option>
        ))}
      </select>
    </div>
  );
}