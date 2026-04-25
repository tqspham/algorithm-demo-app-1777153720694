interface ExecutionResult {
  steps: Array<{
    highlighted: number[];
    comparing: number[];
    swapped: number[];
    sorted: number[];
    description?: string;
  }>;
  statistics: {
    comparisons: number;
    swaps: number;
    iterations: number;
    operations: number;
  };
}

export function bubbleSort(data: number[]): ExecutionResult {
  const arr = [...data];
  const steps: ExecutionResult['steps'] = [];
  let comparisons = 0;
  let swaps = 0;
  let iterations = 0;
  const sorted: number[] = [];

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    iterations++;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      iterations++;

      steps.push({
        highlighted: [],
        comparing: [j, j + 1],
        swapped: [],
        sorted: [...sorted],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;

        steps.push({
          highlighted: [],
          comparing: [],
          swapped: [j, j + 1],
          sorted: [...sorted],
          description: `Swapped ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }
    sorted.push(n - i - 1);
  }

  sorted.push(0);
  steps.push({
    highlighted: [],
    comparing: [],
    swapped: [],
    sorted: [...Array(n).keys()],
    description: 'Sorting complete!',
  });

  return {
    steps,
    statistics: {
      comparisons,
      swaps,
      iterations,
      operations: comparisons + swaps,
    },
  };
}
