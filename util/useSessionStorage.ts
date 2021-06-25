import { useEffect, useState } from "react";

export function useSessionStorage<K extends string, V>(
  key: K,
  fallback: V
): [V, (value: V) => void] {
  const [state, setState] = useState<V>(fallback);

  useEffect(() => {
    const json = sessionStorage.getItem(key);
    if (json) {
      setState(JSON.parse(json));
    } else {
      setState(fallback);
    }
  }, [key, fallback]);

  useEffect(() => {
    const json = JSON.stringify(state);
    if (!json) {
      throw new Error("couldn't convert value to JSON");
    }
    sessionStorage.setItem(key, json);
  }, [state, key]);

  return [state, setState];
}
