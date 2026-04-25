import { create } from 'zustand';
import { executeAlgorithm } from '@/lib/algorithmExecutor';

interface StepData {
  highlighted: number[];
  comparing: number[];
  swapped: number[];
  sorted: number[];
  description?: string;
}

interface Statistics {
  comparisons: number;
  swaps: number;
  iterations: number;
  operations: number;
}

interface AlgorithmState {
  selectedAlgorithm: string | null;
  dataset: number[];
  steps: StepData[];
  currentStep: number;
  isRunning: boolean;
  isLoading: boolean;
  error: string | null;
  speed: number;
  statistics: Statistics;

  setSelectedAlgorithm: (id: string) => void;
  setDataset: (data: number[]) => void;
  setError: (error: string | null) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setSpeed: (speed: number) => void;
  executeAlgo: () => Promise<void>;
}

let animationFrameId: number | null = null;

export const useAlgorithmStore = create<AlgorithmState>((set, get) => ({
  selectedAlgorithm: null,
  dataset: [],
  steps: [],
  currentStep: 0,
  isRunning: false,
  isLoading: false,
  error: null,
  speed: 1,
  statistics: {
    comparisons: 0,
    swaps: 0,
    iterations: 0,
    operations: 0,
  },

  setSelectedAlgorithm: (id: string): void => {
    set({ selectedAlgorithm: id });
  },

  setDataset: (data: number[]): void => {
    set({ dataset: data });
    get().executeAlgo();
  },

  setError: (error: string | null): void => {
    set({ error });
  },

  executeAlgo: async (): Promise<void> => {
    const state = get();
    if (!state.selectedAlgorithm || state.dataset.length === 0) {
      return;
    }

    set({ isLoading: true, error: null, currentStep: 0, isRunning: false });

    try {
      const { steps, statistics } = await executeAlgorithm(
        state.selectedAlgorithm,
        [...state.dataset]
      );

      set({
        steps,
        statistics,
        isLoading: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Algorithm execution failed';
      set({ error: message, isLoading: false });
    }
  },

  play: (): void => {
    const state = get();
    if (state.currentStep >= state.steps.length - 1) {
      return;
    }

    set({ isRunning: true });

    const animate = (): void => {
      set((s) => ({
        currentStep: Math.min(s.currentStep + 1, s.steps.length - 1),
      }));

      const updatedState = get();
      if (updatedState.currentStep >= updatedState.steps.length - 1) {
        set({ isRunning: false });
        return;
      }

      const delay = 100 / updatedState.speed;
      animationFrameId = window.setTimeout(animate, delay);
    };

    const delay = 100 / state.speed;
    animationFrameId = window.setTimeout(animate, delay);
  },

  pause: (): void => {
    if (animationFrameId !== null) {
      clearTimeout(animationFrameId);
      animationFrameId = null;
    }
    set({ isRunning: false });
  },

  reset: (): void => {
    if (animationFrameId !== null) {
      clearTimeout(animationFrameId);
      animationFrameId = null;
    }
    set({ currentStep: 0, isRunning: false });
  },

  nextStep: (): void => {
    const state = get();
    if (state.currentStep < state.steps.length - 1) {
      set({ currentStep: state.currentStep + 1 });
    }
  },

  prevStep: (): void => {
    const state = get();
    if (state.currentStep > 0) {
      set({ currentStep: state.currentStep - 1 });
    }
  },

  setSpeed: (speed: number): void => {
    set({ speed });
  },
}));
