'use client';

import { useAlgorithmStore } from '@/store/algorithmStore';
import { getAlgorithmById } from '@/constants/algorithms';

export function ComplexityDisplay(): React.ReactElement {
  const { selectedAlgorithm } = useAlgorithmStore();

  if (!selectedAlgorithm) return <div />;

  const algorithm = getAlgorithmById(selectedAlgorithm);
  if (!algorithm) return <div />;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Complexity</h3>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold mb-2">
            Time Complexity
          </p>
          <div className="bg-gray-200 rounded-md px-3 py-2">
            <p className="text-sm font-mono text-gray-900">{algorithm.timeComplexity}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold mb-2">
            Space Complexity
          </p>
          <div className="bg-gray-200 rounded-md px-3 py-2">
            <p className="text-sm font-mono text-gray-900">{algorithm.spaceComplexity}</p>
          </div>
        </div>

        {algorithm.description && (
          <div>
            <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold mb-2">
              Description
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {algorithm.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
