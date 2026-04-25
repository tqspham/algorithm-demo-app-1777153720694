'use client';

import { useAlgorithmStore } from '@/store/algorithmStore';

export function Visualization(): React.ReactElement {
  const { dataset, steps, currentStep } = useAlgorithmStore();

  if (dataset.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-12 border border-gray-300 text-center">
        <p className="text-gray-600">Load a dataset to begin visualization</p>
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
    <div className="bg-gray-50 rounded-lg p-8 border border-gray-300">
      <div className="flex items-end justify-center gap-1 h-80 mb-6">
        {dataset.map((value, index) => {
          const height = (value / maxValue) * barHeight;
          const isHighlighted = highlightedIndices.includes(index);
          const isComparing = compareIndices.includes(index);
          const isSwapped = swappedIndices.includes(index);
          const isSorted = sorted.includes(index);

          let bgColor = 'bg-gray-500';
          if (isSorted) bgColor = 'bg-gray-700';
          else if (isSwapped) bgColor = 'bg-gray-600';
          else if (isComparing) bgColor = 'bg-gray-400';
          else if (isHighlighted) bgColor = 'bg-gray-300';

          return (
            <div
              key={index}
              className={`flex-1 rounded-t transition-all duration-100 ${bgColor}`}
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

      <div className="text-center text-gray-700 text-sm mb-6">
        <p>
          Step {currentStep + 1} of {Math.max(steps.length, 1)}
        </p>
        {currentStepData?.description && (
          <p className="text-gray-600 mt-2">{currentStepData.description}</p>
        )}
      </div>

      <div className="flex justify-center gap-6 text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded"></div>
          <span>Swapped</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span>Highlighted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>
    </div>
  );
}
