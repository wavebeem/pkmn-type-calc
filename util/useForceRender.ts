import { useReducer } from "react";

export function useForceRender(): () => void {
  const [, forceRender] = useReducer((x: number) => x + 1, 0);
  return forceRender;
}
