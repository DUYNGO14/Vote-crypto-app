import {useState, useEffect, useCallback} from 'react';

interface UseCountdownProps {
  initialSeconds: number; // milliseconds
  onCountdownEnd?: () => void;
  autoStart?: boolean;
  mode?: 'countdown' | 'stopwatch';
  maxSeconds?: number;
}

export const useCountdown = ({
  initialSeconds,
  onCountdownEnd,
  autoStart = true,
  mode = 'countdown',
  maxSeconds,
}: UseCountdownProps) => {

  // Convert ms → seconds
  const [remainingSeconds, setRemainingSeconds] = useState((initialSeconds ?? 0) / 1000);
  const [isActive, setIsActive] = useState(autoStart);
  useEffect(() => {
    setRemainingSeconds((initialSeconds ?? 0) / 1000);
  }, [initialSeconds]);
  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return [hrs, mins, secs].map(v => String(v).padStart(2, '0')).join(':');
  }, []);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);

  const reset = useCallback(() => {
    setRemainingSeconds((initialSeconds ?? 0) / 1000);
    setIsActive(autoStart);
  }, [initialSeconds, autoStart]);

  const restart = useCallback(
    (newSeconds?: number) => {
      setRemainingSeconds((newSeconds ?? initialSeconds) / 1000);
      setIsActive(true);
    },
    [initialSeconds],
  );

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (mode === 'countdown') return Math.max(prev - 1, 0);
        const next = prev + 1;
        return maxSeconds !== undefined ? Math.min(next, maxSeconds) : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, mode, maxSeconds]);

  useEffect(() => {
    if (mode === 'countdown' && remainingSeconds === 0 && isActive) {
      setIsActive(false);
      if (onCountdownEnd) setTimeout(onCountdownEnd, 0);
    }
    if (
      mode === 'stopwatch' &&
      maxSeconds !== undefined &&
      remainingSeconds >= maxSeconds &&
      isActive
    ) {
      setIsActive(false);
      if (onCountdownEnd) setTimeout(onCountdownEnd, 0);
    }
  }, [remainingSeconds, isActive, mode, maxSeconds, onCountdownEnd]);

  return {
    formattedTime: formatTime(remainingSeconds),
    remainingSeconds,
    isActive,
    start,
    pause,
    reset,
    restart,
  };
};
