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

export function selectionSort(data: number[]): ExecutionResult {
  const arr = [...data];
  const steps: ExecutionResult['steps'] = [];
  let comparisons = 0;
  let swaps = 0;
  let iterations = 0;
  const sorted: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    iterations++;
    let minIdx = i;

    steps.push({
      highlighted: [i],
      comparing: [],
      swapped: [],
      sorted: [...sorted],
      description: `Finding minimum from index ${i}`,
    });

    for (let j = i + 1; j < arr.length; j++) {
      comparisons++;
      iterations++;

      steps.push({
        highlighted: [minIdx],
        comparing: [j],
        swapped: [],
        sorted: [...sorted],
        description: `Comparing ${arr[j]} with minimum ${arr[minIdx]}`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;

      steps.push({
        highlighted: [],
        comparing: [],
        swapped: [i, minIdx],
        sorted: [...sorted],
        description: `Swapped ${arr[i]} and ${arr[minIdx]}`,
      });
    }

    sorted.push(i);
  }

  sorted.push(arr.length - 1);
  steps.push({
    highlighted: [],
    comparing: [],
    swapped: [],
    sorted: [...Array(arr.length).keys()],
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
