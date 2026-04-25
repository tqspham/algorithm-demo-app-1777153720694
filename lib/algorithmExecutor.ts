import { getAlgorithmById } from '@/constants/algorithms';
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
  heapSort,
  linearSearch,
  binarySearch,
  dfs,
  bfs,
} from '@/lib/algorithms';

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

export async function executeAlgorithm(
  algorithmId: string,
  dataset: number[]
): Promise<ExecutionResult> {
  const algorithm = getAlgorithmById(algorithmId);
  if (!algorithm) {
    throw new Error('Algorithm not found');
  }

  const algorithmMap: Record<
    string,
    (data: number[]) => ExecutionResult
  > = {
    'bubble-sort': bubbleSort,
    'quick-sort': quickSort,
    'merge-sort': mergeSort,
    'insertion-sort': insertionSort,
    'selection-sort': selectionSort,
    'heap-sort': heapSort,
    'linear-search': linearSearch,
    'binary-search': binarySearch,
    dfs,
    bfs,
  };

  const executor = algorithmMap[algorithmId];
  if (!executor) {
    throw new Error(`Executor not found for algorithm: ${algorithmId}`);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const result = executor(dataset);
      resolve(result);
    }, 10);
  });
}
