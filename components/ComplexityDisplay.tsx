'use client';

import { useAlgorithmStore } from '@/store/algorithmStore';
import { getAlgorithmById } from '@/constants/algorithms';

export function ComplexityDisplay(): React.ReactElement {
  const { selectedAlgorithm } = useAlgorithmStore();

  if (!selectedAlgorithm) return <div />;

  const algorithm = getAlgorithmById(selectedAlgorithm);
  if (!algorithm) return <div />;

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
      <h3 className="text-lg font-semibold text-slate-200">Complexity</h3>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
            Time Complexity
          </p>
          <div className="bg-slate-700 rounded px-3 py-2">
            <p className="text-sm font-mono text-green-400">{algorithm.timeComplexity}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
            Space Complexity
          </p>
          <div className="bg-slate-700 rounded px-3 py-2">
            <p className="text-sm font-mono text-blue-400">{algorithm.spaceComplexity}</p>
          </div>
        </div>

        {algorithm.description && (
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Description
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {algorithm.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}