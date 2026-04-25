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

export function binarySearch(data: number[]): ExecutionResult {
  const arr = [...data].sort((a, b) => a - b);
  const steps: ExecutionResult['steps'] = [];
  let comparisons = 0;
  let iterations = 0;
  const target = arr[Math.floor(arr.length / 2)];

  steps.push({
    highlighted: [],
    comparing: [],
    swapped: [],
    sorted: [],
    description: `Searching for target: ${target} in sorted array`,
  });

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    iterations++;
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    steps.push({
      highlighted: [mid],
      comparing: [left, mid, right],
      swapped: [],
      sorted: [],
      description: `Checking middle element at index ${mid}: ${arr[mid]}`,
    });

    if (arr[mid] === target) {
      steps.push({
        highlighted: [mid],
        comparing: [],
        swapped: [],
        sorted: [],
        description: `Found ${target} at index ${mid}!`,
      });
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        highlighted: [],
        comparing: [],
        swapped: [],
        sorted: [],
        description: `${arr[mid]} < ${target}, searching right half`,
      });
    } else {
      right = mid - 1;
      steps.push({
        highlighted: [],
        comparing: [],
        swapped: [],
        sorted: [],
        description: `${arr[mid]} > ${target}, searching left half`,
      });
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
