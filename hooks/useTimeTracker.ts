import { useEffect, useState } from 'react';

type time = {
  duration: number;
  start: () => void;
  stop: () => void;
  pause: () => void;
  isRunning: boolean;
  advanceTime: (time: number) => void;
  status: status;
};

type status = 'running' | 'paused' | 'stopped';

/**
 * A custom hook to track time. It returns the current time in seconds and provides methods to start, pause and stop the timer.
 * @returns {time: number, start: () => void, pause: () => void, stop: () => void}
 */
const useTimeTracker = (): time => {
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<status>('stopped');

  const start = () => {
    setIsRunning(true);
    setStatus('running');
  };

  const pause = () => {
    setIsRunning(false);
    setStatus('paused');
  };

  const stop = () => {
    setDuration(0);
    setIsRunning(false);
    setStatus('stopped');
  };

  const advanceTime = (time: number) => {
    setDuration((duration) => duration + time);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setDuration((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return { duration, start, pause, stop, isRunning, advanceTime, status };
};

export default useTimeTracker;
