import { useState, useRef, useCallback } from 'react';

type UseTimerReturnDef = {
  count: number;
  startTimer: () => void;
  endTimer: () => void;
};

interface useTimerProps {
  time: number;
}

export default function useTimer({ time = 60 }: useTimerProps): UseTimerReturnDef {
  const [count, setCount] = useState<number>(time);
  const timerRef = useRef<any>(-1);

  const startTimer = useCallback(() => {
    setCount(time);
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    timerRef.current = timer;
  }, []);

  const endTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setCount(0);
  }, []);

  return { count, startTimer, endTimer };
}
