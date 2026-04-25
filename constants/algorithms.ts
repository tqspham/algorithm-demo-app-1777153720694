export interface Algorithm {
  id: string;
  name: string;
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
}

export const ALGORITHMS: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient for large datasets.',
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    timeComplexity: 'O(n log n) average, O(n²) worst',
    spaceComplexity: 'O(log n)',
    description:
      'Divide-and-conquer algorithm that partitions the array around a pivot and recursively sorts the sub-arrays. Generally very efficient.',
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description:
      'Divide-and-conquer algorithm that divides the array in half, recursively sorts each half, and merges them back together. Guaranteed O(n log n) performance.',
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Builds the sorted array one item at a time by inserting elements into their correct position. Efficient for small datasets or nearly sorted data.',
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Divides the array into sorted and unsorted portions, repeatedly selecting the minimum element from the unsorted part and moving it to the sorted part.',
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description:
      'Uses a heap data structure to sort elements. Builds a max heap and repeatedly extracts the maximum element. Guarantees O(n log n) performance.',
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description:
      'Searches for a target value by checking each element sequentially from start to end. Simple but slower for large datasets.',
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description:
      'Efficiently searches a sorted array by repeatedly dividing the search space in half. Much faster than linear search for large datasets.',
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graph Traversal',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description:
      'Explores a graph by going as deep as possible along each branch before backtracking. Uses a stack or recursion. Good for detecting cycles.',
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'Graph Traversal',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description:
      'Explores a graph level by level, visiting all neighbors of a node before moving to the next level. Uses a queue. Good for shortest paths.',
  },
];

export function getAlgorithmById(id: string): Algorithm | undefined {
  return ALGORITHMS.find((algo) => algo.id === id);
}
