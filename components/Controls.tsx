'use client';

import { useEffect } from 'react';
import { useAlgorithmStore } from '@/store/algorithmStore';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export function Controls(): React.ReactElement {
  const {
    isRunning,
    currentStep,
    steps,
    speed,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    setSpeed,
  } = useAlgorithmStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
          pause();
        } else if (currentStep < steps.length - 1) {
          play();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, currentStep, steps.length, play, pause]);

  const isAtEnd = currentStep >= steps.length - 1;
  const isAtStart = currentStep === 0;

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => (isRunning ? pause() : play())}
          disabled={isAtEnd && !isRunning}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          title="Space to toggle play/pause"
        >
          {isRunning ? (
            <>
              <Pause size={20} />
              Pause
            </>
          ) : (
            <>
              <Play size={20} />
              Play
            </>
          )}
        </button>

        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <RotateCcw size={20} />
          Reset
        </button>

        <button
          onClick={() => prevStep()}
          disabled={isAtStart}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <button
          onClick={() => nextStep()}
          disabled={isAtEnd}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <ChevronRight size={20} />
          Next
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="speed-slider"
            className="text-sm font-semibold text-slate-300"
          >
            Speed
          </label>
          <span className="text-sm font-mono bg-slate-700 px-3 py-1 rounded text-blue-400">
            {speed.toFixed(1)}x
          </span>
        </div>
        <input
          id="speed-slider"
          type="range"
          min="0.25"
          max="2"
          step="0.25"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Adjust execution speed from 0.25x to 2x"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>0.25x</span>
          <span>2x</span>
        </div>
      </div>
    </div>
  );
}