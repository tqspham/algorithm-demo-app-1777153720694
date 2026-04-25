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

interface DfsContext {
  steps: ExecutionResult['steps'];
  visited: Set<number>;
  comparisons: number;
  iterations: number;
}

function dfsHelper(
  node: number,
  graph: Map<number, number[]>,
  context: DfsContext,
  visitedOrder: number[]
): void {
  context.visited.add(node);
  visitedOrder.push(node);
  context.iterations++;

  context.steps.push({
    highlighted: [node],
    comparing: [],
    swapped: [],
    sorted: visitedOrder,
    description: `Visiting node ${node}`,
  });

  const neighbors = graph.get(node) || [];
  for (const neighbor of neighbors) {
    context.comparisons++;
    if (!context.visited.has(neighbor)) {
      dfsHelper(neighbor, graph, context, visitedOrder);
    }
  }
}

export function dfs(data: number[]): ExecutionResult {
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

  const context: DfsContext = {
    steps: [] as ExecutionResult['steps'],
    visited: new Set<number>(),
    comparisons: 0,
    iterations: 0,
  };

  const visitedOrder: number[] = [];

  context.steps.push({
    highlighted: [],
    comparing: [],
    swapped: [],
    sorted: [],
    description: `Starting DFS from node 0`,
  });

  dfsHelper(0, graph, context, visitedOrder);

  context.steps.push({
    highlighted: visitedOrder,
    comparing: [],
    swapped: [],
    sorted: visitedOrder,
    description: `DFS complete! Visited nodes in order: ${visitedOrder.join(' → ')}`,
  });

  return {
    steps: context.steps,
    statistics: {
      comparisons: context.comparisons,
      swaps: 0,
      iterations: context.iterations,
      operations: context.comparisons,
    },
  };
}
