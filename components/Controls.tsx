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
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300 space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => (isRunning ? pause() : play())}
          disabled={isAtEnd && !isRunning}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          title="Space to toggle play/pause"
        >
          {isRunning ? (
            <>
              <Pause size={18} />
              Pause
            </>
          ) : (
            <>
              <Play size={18} />
              Play
            </>
          )}
        </button>

        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <button
          onClick={() => prevStep()}
          disabled={isAtStart}
          className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          onClick={() => nextStep()}
          disabled={isAtEnd}
          className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
        >
          <ChevronRight size={18} />
          Next
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="speed-slider"
            className="text-sm font-semibold text-gray-800"
          >
            Speed
          </label>
          <span className="text-sm font-mono bg-gray-200 px-3 py-1 rounded-md text-gray-800">
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
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-label="Adjust execution speed from 0.25x to 2x"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>0.25x</span>
          <span>2x</span>
        </div>
      </div>
    </div>
  );
}
