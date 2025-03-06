import { useState, useEffect, useRef } from "react";

interface UseTimerOptions {
  onStopWatchPause?: () => void;
}

const useStopWatch = ({ onStopWatchPause }: UseTimerOptions = {}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker("stopwatchWorker.js");

    workerRef.current.onmessage = (e) => {
      const { type, elapsedTime } = e.data;
      if (type === "stopwatch") {
        setElapsedTime(elapsedTime);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const startStopWatch = () => {
    workerRef.current?.postMessage({ type: "start-stopwatch" });
    setIsRunning(true);
  };

  const pauseStopWatch = () => {
    workerRef.current?.postMessage({ type: "pause-stopwatch" });
    setIsRunning(false);
    if (onStopWatchPause) onStopWatchPause();
  };

  return {
    elapsedTime,
    isRunning,
    startStopWatch,
    pauseStopWatch,
  };
};

export default useStopWatch;
