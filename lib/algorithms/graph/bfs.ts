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

export function bfs(data: number[]): ExecutionResult {
  const numNodes = Math.max(...data, 0) + 1;
  const graph = new Map<number, number[]>();

  for (let i = 0; i < numNodes; i++) {
    graph.set(i, []);
  }

  for (let i = 0; i < data.length - 1; i += 2) {
    const from = data[i];
    const to = data[i + 1];
    const neighbors = graph.get(from) || [];
    neighbors.push(to);
    graph.set(from, neighbors);
  }

  const steps: ExecutionResult['steps'] = [];
  const visited = new Set<number>();
  const queue: number[] = [0];
  let comparisons = 0;
  let iterations = 0;
  const visitedOrder: number[] = [];

  steps.push({
    highlighted: [],
    comparing: [],
    swapped: [],
    sorted: [],
    description: `Starting BFS from node 0`,
  });

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === undefined) break;

    if (visited.has(node)) continue;

    visited.add(node);
    visitedOrder.push(node);
    iterations++;

    steps.push({
      highlighted: [node],
      comparing: [],
      swapped: [],
      sorted: visitedOrder,
      description: `Visiting node ${node}`,
    });

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      comparisons++;
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        steps.push({
          highlighted: [node, neighbor],
          comparing: [neighbor],
          swapped: [],
          sorted: visitedOrder,
          description: `Added node ${neighbor} to queue`,
        });
      }
    }
  }

  steps.push({
    highlighted: visitedOrder,
    comparing: [],
    swapped: [],
    sorted: visitedOrder,
    description: `BFS complete! Visited nodes in order: ${visitedOrder.join(' → ')}`,
  });

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
