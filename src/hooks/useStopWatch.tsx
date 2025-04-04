import { useState, useEffect, useRef } from "react";
import useUser from "./useUser";
import useTodayQuery from "./query/useTodayQuery";

interface UseTimerOptions {
  onStopWatchPause?: () => void;
}

const useStopWatch = ({ onStopWatchPause }: UseTimerOptions = {}) => {
  const { user } = useUser();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  const { updateTodayTime } = useTodayQuery();

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
    workerRef.current?.postMessage({ type: "start-stopwatch", elapsedTime });
    setIsRunning(true);
  };

  const pauseStopWatch = async () => {
    workerRef.current?.postMessage({ type: "pause-stopwatch" });
    setIsRunning(false);
    if (onStopWatchPause) onStopWatchPause();
    if (!user) return;
    updateTodayTime.mutate({ field: "actual_time", value: elapsedTime });
  };

  return {
    elapsedTime,
    setElapsedTime,
    isRunning,
    startStopWatch,
    pauseStopWatch,
  };
};

export default useStopWatch;
