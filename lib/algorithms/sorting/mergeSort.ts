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

interface MergeSortContext {
  steps: ExecutionResult['steps'];
  comparisons: number;
  swaps: number;
  iterations: number;
  sorted: number[];
}

function merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  context: MergeSortContext
): void {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    context.comparisons++;
    context.iterations++;

    context.steps.push({
      highlighted: [left + i, mid + 1 + j],
      comparing: [left + i, mid + 1 + j],
      swapped: [],
      sorted: [...context.sorted],
      description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
    });

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
    context.swaps++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
    context.iterations++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
    context.iterations++;
  }
}

function mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  context: MergeSortContext
): void {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSortHelper(arr, left, mid, context);
    mergeSortHelper(arr, mid + 1, right, context);
    merge(arr, left, mid, right, context);
  }
}

export function mergeSort(data: number[]): ExecutionResult {
  const arr = [...data];
  const context: MergeSortContext = {
    steps: [] as ExecutionResult['steps'],
    comparisons: 0,
    swaps: 0,
    iterations: 0,
    sorted: [] as number[],
  };

  if (arr.length > 0) {
    mergeSortHelper(arr, 0, arr.length - 1, context);
  }

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
