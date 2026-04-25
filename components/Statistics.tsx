'use client';

import { useAlgorithmStore } from '@/store/algorithmStore';

export function Statistics(): React.ReactElement {
  const { statistics } = useAlgorithmStore();

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-200 rounded-md p-4">
          <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold">Comparisons</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {statistics.comparisons}
          </p>
        </div>
        <div className="bg-gray-200 rounded-md p-4">
          <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold">Swaps</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {statistics.swaps}
          </p>
        </div>
        <div className="bg-gray-200 rounded-md p-4">
          <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold">Iterations</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {statistics.iterations}
          </p>
        </div>
        <div className="bg-gray-200 rounded-md p-4">
          <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold">Operations</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {statistics.operations}
          </p>
        </div>
      </div>
    </div>
  );
}
