import { useEffect, useState } from 'react';

type time = {
  duration: number;
  start: () => void;
  stop: () => void;
  pause: () => void;
  isRunning: boolean;
  advanceTime: (time: number) => void;
  reset: () => void;
  status: status;
  startTime: number;
  endTime: number;
};

type status = 'running' | 'paused' | 'stopped';

/**
 * A custom hook to track time. It returns the current time in seconds and provides methods to start, pause and stop the timer.
 * @returns {time: number, start: () => void, stop: () => void, pause: () => void, isRunning: boolean, advanceTime: (time: number) => void, reset: () => void, status: status, startTime: number, endTime: number}
 */
const useTimeTracker = (): time => {
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<status>('stopped');
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const start = () => {
    setIsRunning(true);
    setStatus('running');
    setStartTime(Date.now());
  };

  const pause = () => {
    setIsRunning(false);
    setStatus('paused');
  };

  const stop = () => {
    setDuration(0);
    setIsRunning(false);
    setStatus('stopped');
    setEndTime(Date.now());
  };

  const advanceTime = (time: number) => {
    setDuration((duration) => duration + time);
  };

  const reset = () => {
    setDuration(0);
    setIsRunning(false);
    setStatus('stopped');
    setStartTime(0);
    setEndTime(0);
  }

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

  return { duration, start, pause, stop, isRunning, advanceTime, reset, status, startTime, endTime };
};

export default useTimeTracker;
