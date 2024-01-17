import { useEffect, useState } from "react";
import { create } from "zustand";

type timerState = {
  remainingSeconds: number | null;
  setRemainingSeconds: (seconds: number | null) => void;
};

export const useTime = create<timerState>()((set) => ({
  remainingSeconds: null,
  setRemainingSeconds: (seconds) => set(() => ({ remainingSeconds: seconds })),
}));

export const useTimer = () => {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [stoped, setStoped] = useState(false);

  useEffect(() => {
    if (!started || stoped) return;
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [started, stoped]);

  return {
    startTimer: () => setStarted(true),
    stopTimer: () => setStoped(true),
    seconds,
  };
};
