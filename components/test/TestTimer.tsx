import { useEffect, useState } from 'react';

interface TestTimerProps {
  timeLimit: number; // in minutes
  onTimeUp: () => void;
}

export function TestTimer({ timeLimit, onTimeUp }: TestTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(timeLimit * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const isWarning = remainingSeconds < 300; // Less than 5 minutes
  const isCritical = remainingSeconds < 60; // Less than 1 minute

  return (
    <div
      className={`rounded-xl border-2 px-4 py-3 transition-all ${
        isCritical
          ? 'border-red-500 bg-red-50'
          : isWarning
          ? 'border-yellow-500 bg-yellow-50'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <svg
          className={`h-5 w-5 ${
            isCritical ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-slate-600'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-600">Time Remaining</p>
          <p
            className={`text-xl font-bold ${
              isCritical ? 'text-red-700' : isWarning ? 'text-yellow-700' : 'text-slate-900'
            }`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}
