'use client';

import { useAlgorithmStore } from '@/store/algorithmStore';

export function Statistics(): React.ReactElement {
  const { statistics } = useAlgorithmStore();

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-700 rounded p-4">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Comparisons</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {statistics.comparisons}
          </p>
        </div>
        <div className="bg-slate-700 rounded p-4">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Swaps</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">
            {statistics.swaps}
          </p>
        </div>
        <div className="bg-slate-700 rounded p-4">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Iterations</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {statistics.iterations}
          </p>
        </div>
        <div className="bg-slate-700 rounded p-4">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Operations</p>
          <p className="text-2xl font-bold text-green-400 mt-1">
            {statistics.operations}
          </p>
        </div>
      </div>
    </div>
  );
}