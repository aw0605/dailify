import { useState, useEffect, useRef, useCallback } from "react";
import useModalStore from "@/zustand/useModalStore";

interface UseTimerOptions {
  onTimerEnd?: () => void;
}

const useTimer = ({ onTimerEnd }: UseTimerOptions = {}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    const newWorker = new Worker("timerWorker.js");
    workerRef.current = newWorker;

    newWorker.onmessage = (e) => {
      const { type, timeLeft } = e.data;
      switch (type) {
        case "timer":
          setTimeLeft(timeLeft);
          break;
        case "timer-end":
          setTimeLeft(0);
          setIsRunning(false);
          if (onTimerEnd) onTimerEnd();
          openModal("timerEndModal");
          break;
      }
    };

    return () => {
      newWorker.terminate();
      workerRef.current = null;
    };
  }, []);

  const startTimer = useCallback((totalMs: number) => {
    if (workerRef.current && totalMs > 0) {
      workerRef.current.postMessage({ type: "start-timer", target: totalMs });
      setIsRunning(true);
    }
  }, []);

  const pauseTimer = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "pause-timer" });
      setIsRunning(false);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "resume-timer" });
      setIsRunning(true);
    }
  }, []);

  return {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
  };
};

export default useTimer;
