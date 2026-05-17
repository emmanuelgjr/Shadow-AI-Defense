import { useEffect, useState } from 'react';

const KEY = 'shadow-ai-defense.stack';

export function useStack(): [string | null, (s: string | null) => void] {
  const [stack, setStackState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setStackState(localStorage.getItem(KEY));
  }, []);

  const setStack = (s: string | null) => {
    if (typeof window === 'undefined') return;
    if (s) localStorage.setItem(KEY, s);
    else localStorage.removeItem(KEY);
    setStackState(s);
  };

  return [stack, setStack];
}
