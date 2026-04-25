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

export function insertionSort(data: number[]): ExecutionResult {
  const arr = [...data];
  const steps: ExecutionResult['steps'] = [];
  let comparisons = 0;
  let swaps = 0;
  let iterations = 0;
  const sorted: number[] = [0];

  for (let i = 1; i < arr.length; i++) {
    iterations++;
    const key = arr[i];
    let j = i - 1;

    steps.push({
      highlighted: [i],
      comparing: [],
      swapped: [],
      sorted: [...sorted],
      description: `Inserting ${key} into sorted portion`,
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      iterations++;

      steps.push({
        highlighted: [i],
        comparing: [j, i],
        swapped: [],
        sorted: [...sorted],
        description: `Comparing ${arr[j]} with ${key}`,
      });

      arr[j + 1] = arr[j];
      swaps++;
      j--;

      steps.push({
        highlighted: [i],
        comparing: [],
        swapped: [j + 1],
        sorted: [...sorted],
        description: `Shifted ${arr[j + 1]} right`,
      });
    }

    arr[j + 1] = key;
    sorted.push(i);
  }

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
