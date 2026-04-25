'use client';

import { useAlgorithmStore } from '@/store/algorithmStore';

export function Visualization(): React.ReactElement {
  const { dataset, steps, currentStep } = useAlgorithmStore();

  if (dataset.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
        <p className="text-slate-400">Load a dataset to begin visualization</p>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const highlightedIndices = currentStepData?.highlighted || [];
  const compareIndices = currentStepData?.comparing || [];
  const swappedIndices = currentStepData?.swapped || [];
  const sorted = currentStepData?.sorted || [];

  const maxValue = Math.max(...dataset);
  const barHeight = 200;

  return (
    <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
      <div className="flex items-end justify-center gap-1 h-80 mb-4">
        {dataset.map((value, index) => {
          const height = (value / maxValue) * barHeight;
          const isHighlighted = highlightedIndices.includes(index);
          const isComparing = compareIndices.includes(index);
          const isSwapped = swappedIndices.includes(index);
          const isSorted = sorted.includes(index);

          let bgColor = 'bg-blue-500';
          if (isSorted) bgColor = 'bg-green-500';
          else if (isSwapped) bgColor = 'bg-red-500';
          else if (isComparing) bgColor = 'bg-yellow-400';
          else if (isHighlighted) bgColor = 'bg-cyan-400';

          return (
            <div
              key={index}
              className={`flex-1 rounded-t transition-all duration-100 ${bgColor} ${isComparing ? 'ring-2 ring-yellow-200' : ''}`}
              style={{
                height: `${height}px`,
                minHeight: '4px',
              }}
              title={`Value: ${value}`}
              role="presentation"
            />
          );
        })}
      </div>

      <div className="text-center text-slate-300 text-sm">
        <p>
          Step {currentStep + 1} of {Math.max(steps.length, 1)}
        </p>
        {currentStepData?.description && (
          <p className="text-slate-400 mt-2">{currentStepData.description}</p>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-8 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Swapped</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-400 rounded"></div>
          <span>Highlighted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>
    </div>
  );
}