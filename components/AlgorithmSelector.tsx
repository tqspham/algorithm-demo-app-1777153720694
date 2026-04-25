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
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
      <label
        htmlFor="algorithm-select"
        className="block text-sm font-semibold text-gray-800 mb-3"
      >
        Select Algorithm
      </label>
      <select
        id="algorithm-select"
        aria-label="Select an algorithm to visualize"
        value={selectedAlgorithm || ''}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full bg-white text-gray-900 border border-gray-400 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
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
