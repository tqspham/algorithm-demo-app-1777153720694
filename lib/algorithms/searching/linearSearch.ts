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

export function linearSearch(data: number[]): ExecutionResult {
  const arr = [...data];
  const steps: ExecutionResult['steps'] = [];
  let comparisons = 0;
  let iterations = 0;
  const target = arr[Math.floor(arr.length / 2)];

  steps.push({
    highlighted: [],
    comparing: [],
    swapped: [],
    sorted: [],
    description: `Searching for target value: ${target}`,
  });

  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    iterations++;

    steps.push({
      highlighted: [],
      comparing: [i],
      swapped: [],
      sorted: [],
      description: `Checking index ${i}: ${arr[i]}`,
    });

    if (arr[i] === target) {
      steps.push({
        highlighted: [i],
        comparing: [],
        swapped: [],
        sorted: [],
        description: `Found ${target} at index ${i}!`,
      });
      break;
    }
  }

  return {
    steps,
    statistics: {
      comparisons,
      swaps: 0,
      iterations,
      operations: comparisons,
    },
  };
}
