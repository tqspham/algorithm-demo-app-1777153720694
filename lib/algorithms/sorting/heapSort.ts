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

context: {
  steps: ExecutionResult['steps'];
  comparisons: number;
  swaps: number;
  iterations: number;
  sorted: number[];
}

function heapify(
  arr: number[],
  n: number,
  i: number,
  context: any
): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    context.comparisons++;
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    context.comparisons++;
    largest = right;
  }

  if (largest !== i) {
    context.iterations++;

    context.steps.push({
      highlighted: [i, largest],
      comparing: [i, largest],
      swapped: [],
      sorted: [...context.sorted],
      description: `Comparing heap elements at indices ${i} and ${largest}`,
    });

    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    context.swaps++;

    context.steps.push({
      highlighted: [],
      comparing: [],
      swapped: [i, largest],
      sorted: [...context.sorted],
      description: `Swapped ${arr[largest]} and ${arr[i]}`,
    });

    heapify(arr, n, largest, context);
  }
}

export function heapSort(data: number[]): ExecutionResult {
  const arr = [...data];
  const context = {
    steps: [] as ExecutionResult['steps'],
    comparisons: 0,
    swaps: 0,
    iterations: 0,
    sorted: [] as number[],
  };

  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, context);
  }

  for (let i = n - 1; i > 0; i--) {
    context.iterations++;

    context.steps.push({
      highlighted: [0, i],
      comparing: [],
      swapped: [],
      sorted: [...context.sorted],
      description: `Extracting max element`,
    });

    [arr[0], arr[i]] = [arr[i], arr[0]];
    context.swaps++;
    context.sorted.push(i);

    context.steps.push({
      highlighted: [],
      comparing: [],
      swapped: [0, i],
      sorted: [...context.sorted],
      description: `Placed ${arr[i]} at end`,
    });

    heapify(arr, i, 0, context);
  }

  context.sorted.push(0);
  context.steps.push({
    highlighted: [],
    comparing: [],
    swapped: [],
    sorted: [...Array(arr.length).keys()],
    description: 'Sorting complete!',
  });

  return {
    steps: context.steps,
    statistics: {
      comparisons: context.comparisons,
      swaps: context.swaps,
      iterations: context.iterations,
      operations: context.comparisons + context.swaps,
    },
  };
}
