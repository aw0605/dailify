import { useState, useEffect, useRef } from "react";
import useUser from "./useUser";
import useCalendarStore from "@/zustand/useCalendarStore";
import { setTodayTime } from "@/lib/supabase/today";

interface UseTimerOptions {
  onStopWatchPause?: () => void;
}

const useStopWatch = ({ onStopWatchPause }: UseTimerOptions = {}) => {
  const { user, userId } = useUser();
  const selectedDate = useCalendarStore((state) => state.selectedDate);
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
    workerRef.current?.postMessage({ type: "start-stopwatch", elapsedTime });
    setIsRunning(true);
  };

  const pauseStopWatch = async () => {
    workerRef.current?.postMessage({ type: "pause-stopwatch" });
    setIsRunning(false);
    if (onStopWatchPause) onStopWatchPause();
    if (!user) return;
    await setTodayTime(userId!, selectedDate!, "actual_time", elapsedTime);
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
