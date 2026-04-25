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

interface QuickSortContext {
  steps: ExecutionResult['steps'];
  arr: number[];
  comparisons: number;
  swaps: number;
  iterations: number;
  sorted: number[];
}

function partition(
  arr: number[],
  low: number,
  high: number,
  context: QuickSortContext
): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    context.comparisons++;
    context.iterations++;

    context.steps.push({
      highlighted: [high],
      comparing: [j, high],
      swapped: [],
      sorted: [...context.sorted],
      description: `Comparing ${arr[j]} with pivot ${pivot}`,
    });

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      context.swaps++;

      context.steps.push({
        highlighted: [high],
        comparing: [],
        swapped: [i, j],
        sorted: [...context.sorted],
        description: `Swapped ${arr[j]} and ${arr[i]}`,
      });
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  context.swaps++;
  context.iterations++;

  context.steps.push({
    highlighted: [i + 1],
    comparing: [],
    swapped: [i + 1, high],
    sorted: [...context.sorted],
    description: `Pivot ${pivot} in place`,
  });

  return i + 1;
}

function quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  context: QuickSortContext
): void {
  if (low < high) {
    const pi = partition(arr, low, high, context);
    quickSortHelper(arr, low, pi - 1, context);
    quickSortHelper(arr, pi + 1, high, context);
  }
}

export function quickSort(data: number[]): ExecutionResult {
  const arr = [...data];
  const context: QuickSortContext = {
    steps: [] as ExecutionResult['steps'],
    arr,
    comparisons: 0,
    swaps: 0,
    iterations: 0,
    sorted: [] as number[],
  };

  quickSortHelper(arr, 0, arr.length - 1, context);

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
