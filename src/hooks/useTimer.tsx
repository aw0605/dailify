import { useState, useEffect } from "react";
import useModalStore from "@/zustand/useModalStore";
import TimerEndModal from "@/components/home/Timer/TimerEndModal";

interface UseTimerOptions {
  onTimerEnd?: () => void;
}

const useTimer = ({ onTimerEnd }: UseTimerOptions = {}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [worker, setWorker] = useState<Worker | null>(null);

  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    const newWorker = new Worker("timerWorker.js");

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
          openModal("timerEndModal", <TimerEndModal />);
          break;
      }
    };

    setWorker(newWorker);
    return () => {
      newWorker.terminate();
    };
  }, []);

  const startTimer = (totalMs: number) => {
    if (worker && totalMs > 0) {
      worker.postMessage({ type: "start-timer", target: totalMs });
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    if (worker) {
      worker.postMessage({ type: "pause-timer" });
      setIsRunning(false);
    }
  };

  const resumeTimer = () => {
    if (worker) {
      worker.postMessage({ type: "resume-timer" });
      setIsRunning(true);
    }
  };

  return {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
  };
};

export default useTimer;
